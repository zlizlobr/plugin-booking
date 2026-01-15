/**
 * FieldIdManager - Manages unique field IDs for watched blocks
 * 
 * This script monitors blocks in the WordPress block editor and ensures
 * that watched blocks have unique field_id attributes.
 */

export const FieldIdManager = () => {
    'use strict';

    // Wait for WordPress data API to be available
    if (typeof wp === 'undefined' || !wp.data || !wp.data.subscribe) {
        console.warn('FieldIdManager: WordPress data API not available');
        return;
    }

    // Configuration from PHP
    const config = window.wpcbooking_admin_vars || {};
    const watchedBlocks = config.booking_blocks || [];

    if (!watchedBlocks.length) {
        return;
    }

    // State management
    let previousBlocksState = new Map();
    let usedFieldIds = new Set();
    let isUpdating = false;

    /**
     * Generate unique field ID (similar to PHP uniqid())
     * @returns {string} Unique field ID
     */
    const generateFieldId = () => {
        return 'booking_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
    };

    /**
     * Get block attributes safely
     * @param {Object} block - Block object
     * @returns {Object} Block attributes
     */
    const getBlockAttributes = (block) => {
        return block?.attributes || {};
    };

    /**
     * Check if block is watched
     * @param {Object} block - Block object
     * @returns {boolean} True if block is watched
     */
    const isWatchedBlock = (block) => {
        return watchedBlocks.includes(block?.name);
    };

    /**
     * Get field ID from block attributes
     * @param {Object} attributes - Block attributes
     * @returns {string|null} Field ID or null
     */
    const getFieldId = (attributes) => {
        return attributes?.field_id || null;
    };

    /**
     * Check if field ID is valid (not empty)
     * @param {string} fieldId - Field ID to check
     * @returns {boolean} True if valid
     */
    const isValidFieldId = (fieldId) => {
        return fieldId && fieldId.trim() !== '';
    };

    /**
     * Check if field ID is unique
     * @param {string} fieldId - Field ID to check
     * @returns {boolean} True if unique
     */
    const isUniqueFieldId = (fieldId) => {
        return !usedFieldIds.has(fieldId);
    };

    /**
     * Update block attributes using native WordPress block editor API
     * @param {string} clientId - Block client ID
     * @param {string} newFieldId - New field ID
     */
    const updateBlockFieldId = (clientId, newFieldId) => {
        if (isUpdating) {
            return;
        }

        isUpdating = true;
        
        try {
            // Get current block
            const block = wp.data.select('core/block-editor').getBlock(clientId);
            if (!block) {
                console.warn('FieldIdManager: Block not found:', clientId);
                return;
            }

            // Use the native WordPress method to update block attributes
            const updatedAttributes = {
                ...block.attributes,
                field_id: newFieldId
            };

            // Update using the block editor's native method
            wp.data.dispatch('core/block-editor').updateBlockAttributes(clientId, updatedAttributes);

            // Verify the update was successful
            setTimeout(() => {
                const updatedBlock = wp.data.select('core/block-editor').getBlock(clientId);
                const persistedFieldId = updatedBlock?.attributes?.field_id;

                if (persistedFieldId !== newFieldId) {
                    console.warn('FieldIdManager: Field ID not properly persisted, retrying...');
                    // Try alternative method using replaceBlock
                    const blockContent = wp.blocks.serialize(updatedBlock);
                    wp.data.dispatch('core/block-editor').replaceBlock(clientId, blockContent);
                }
            }, 100);
        } catch (error) {
            console.warn('FieldIdManager: Failed to update block attributes:', error);
        } finally {
            isUpdating = false;
        }
    };

    /**
     * Process a single block
     * @param {Object} block - Block to process
     * @param {string} clientId - Block client ID
     * @returns {boolean} True if block was updated
     */
    const processBlock = (block, clientId) => {
        if (!isWatchedBlock(block)) {
            return false;
        }

        const attributes = getBlockAttributes(block);
        const currentFieldId = getFieldId(attributes);
        
        // Check if block needs a field ID (no field_id attribute at all)
        if (!isValidFieldId(currentFieldId)) {
            const newFieldId = generateFieldId();
            usedFieldIds.add(newFieldId);
            updateBlockFieldId(clientId, newFieldId);
            return true;
        }

        // Check if field ID is unique
        if (!isUniqueFieldId(currentFieldId)) {
            const newFieldId = generateFieldId();
            usedFieldIds.add(newFieldId);
            updateBlockFieldId(clientId, newFieldId);
            return true;
        }

        // Register field ID as used
        usedFieldIds.add(currentFieldId);
        
        return false;
    };

    /**
     * Build current blocks state
     * @param {Array} blocks - Array of blocks
     * @returns {Map} Map of clientId -> block state
     */
    const buildBlocksState = (blocks) => {
        const state = new Map();
        
        const processBlocksRecursively = (blockList) => {
            blockList.forEach(block => {
                if (block.clientId) {
                    const attributes = getBlockAttributes(block);
                    const fieldId = getFieldId(attributes);
                    
                    state.set(block.clientId, {
                        name: block.name,
                        attributes: attributes,
                        fieldId: fieldId,
                        hasFieldId: isValidFieldId(fieldId),
                        isWatched: isWatchedBlock(block)
                    });
                }
                
                // Process inner blocks
                if (block.innerBlocks && block.innerBlocks.length > 0) {
                    processBlocksRecursively(block.innerBlocks);
                }
            });
        };
        
        processBlocksRecursively(blocks);
        return state;
    };

    /**
     * Check if blocks state has changed
     * @param {Map} currentState - Current blocks state
     * @param {Map} previousState - Previous blocks state
     * @returns {boolean} True if state changed
     */
    const hasStateChanged = (currentState, previousState) => {
        if (currentState.size !== previousState.size) {
            return true;
        }

        for (const [clientId, currentBlock] of currentState) {
            const previousBlock = previousState.get(clientId);
            
            if (!previousBlock) {
                return true;
            }

            // Check if watched block state changed
            if (currentBlock.isWatched && (
                currentBlock.name !== previousBlock.name ||
                currentBlock.fieldId !== previousBlock.fieldId ||
                currentBlock.hasFieldId !== previousBlock.hasFieldId
            )) {
                return true;
            }
        }

        return false;
    };

    /**
     * Get blocks from editor
     * @returns {Array} Array of blocks
     */
    const getEditorBlocks = () => {
        try {
            return wp.data.select('core/block-editor').getBlocks();
        } catch (error) {
            console.warn('FieldIdManager: Failed to get blocks:', error);
            return [];
        }
    };

    /**
     * Main processing function
     */
    const processBlocks = () => {
        if (isUpdating) {
            return;
        }

        const blocks = getEditorBlocks();
        const currentState = buildBlocksState(blocks);

        // Only process if state has changed
        if (!hasStateChanged(currentState, previousBlocksState)) {
            return;
        }

        // Reset used field IDs for this processing cycle
        usedFieldIds.clear();

        // Process all blocks
        const processBlocksRecursively = (blockList) => {
            blockList.forEach(block => {
                if (block.clientId) {
                    processBlock(block, block.clientId);
                }
                
                // Process inner blocks
                if (block.innerBlocks && block.innerBlocks.length > 0) {
                    processBlocksRecursively(block.innerBlocks);
                }
            });
        };

        processBlocksRecursively(blocks);

        // Update previous state
        previousBlocksState = new Map(currentState);
    };

    /**
     * Initialize the field ID manager
     */
    const init = () => {
        // Wait for block editor to be ready
        const unsubscribe = wp.data.subscribe(() => {
            try {
                const isEditorReady = wp.data.select('core/block-editor').getBlocks().length >= 0;
                
                if (isEditorReady) {
                    processBlocks();
                }
            } catch (error) {
                // Editor not ready yet, continue waiting
            }
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
    };

    // Initialize immediately
    init();
};
