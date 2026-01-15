import { h } from 'preact';
import { useEffect, useRef, useMemo, useCallback } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { useBookingContext } from '../contexts/BookingContext.jsx';
import { BlockRenderer } from '../blocks/index.js';
import GlassComponent from './GlassComponent.jsx';
import SummarySection from './SummarySection.jsx';

const BookingSection = ({
  step,
  excerpt,
  sections = {},
  is_summary_step = false,
  form_data = {},
  errorManager = null,
  on_validation_change,
  on_edit_step,
}) => {

  const context = useBookingContext();
  const { bookingFormManager, currentStep, maxReachedStep } = context;

 
  // Memoizace aktuálního step section pro stabilní referenci
  const currentStepSection = useMemo(() => {
    return sections[step] || [];
  }, [sections, step]);

  // Memoizace form_data pro aktuální step (pouze relevantní pole)
  const stepFormData = useMemo(() => {
    if (!currentStepSection.length) return {};
    const relevantData = {};
    currentStepSection.forEach((block) => {
      const fieldId = block.attrs?.field_id;
      if (fieldId && form_data[fieldId] !== undefined) {
        relevantData[fieldId] = form_data[fieldId];
      }
    });
    return relevantData;
  }, [currentStepSection, form_data]);

  // Ref pro sledování, zda už byla inicializace provedena
  const initializedStepRef = useRef(null);

  // Ref pro sledování, zda už byl tento step validován
  const validatedStepRef = useRef(null);

  // Inicializuje validaci pro aktuální step s existujícími daty
  useEffect(() => {
    if (!bookingFormManager || !currentStepSection.length) return;

    // Zabraň reinicializaci, pokud už byla provedena pro tento step
    if (initializedStepRef.current === step) return;

    bookingFormManager.initializeStepValidation(step, sections, form_data);
    initializedStepRef.current = step;
  }, [step, bookingFormManager]);

  // Stabilní handler pro validation changes
  const handleValidationChange = useCallback((event) => {
    if (!on_validation_change) return;

    if (event.type === 'field_validation_changed' && event.step === step) {
      const isStepValid = bookingFormManager.isStepValid(step);
      on_validation_change(isStepValid);
    } else if (event.type === 'step_validation_initialized' && event.step === step) {
      on_validation_change(event.isStepValid);
    }
  }, [step, bookingFormManager, on_validation_change]);

  // Naslouchá událostem změn validace a notifikuje parent komponentu
  useEffect(() => {
    if (!bookingFormManager || !on_validation_change) return;

    bookingFormManager.add_listener(handleValidationChange);

    return () => {
      bookingFormManager.remove_listener(handleValidationChange);
    };
  }, [bookingFormManager, handleValidationChange]);

  // Kontroluje validaci po vykreslení bloků: pro už navštívené stepy = valid, pro nové stepy kontroluje uložená data nebo pravidla
  useEffect(() => {
    if (!on_validation_change || !currentStepSection.length) return;

    // Zabraň opakovanému validování, pokud už bylo provedeno pro tento step
    if (validatedStepRef.current === step && currentStep === maxReachedStep) return;

    // Použij requestAnimationFrame místo setTimeout(0) - lepší pro synchronizaci s renderem
    const rafId = requestAnimationFrame(() => {
      // If current step is less than max reached step, always set to valid
      if (currentStep < maxReachedStep) {
        on_validation_change(true);
        validatedStepRef.current = step;
        return;
      }

      // Current logic: only execute when currentStep === maxReachedStep
      // First check if we have data stored from previous fill
      const hasStoredData = currentStepSection.some((block) => {
        const fieldId = block.attrs?.field_id;
        if (!fieldId) return false;
        const value = stepFormData[fieldId];
        return value !== undefined && value !== null && value !== '';
      });

      // If we have stored data, use validation manager to validate
      if (hasStoredData && bookingFormManager) {
        const isValid = bookingFormManager.isStepValid(step);
        on_validation_change(isValid);
        validatedStepRef.current = step;
        return;
      }

      // Fallback: Check if any block has rules
      const hasBlockWithRules = currentStepSection.some((block) => {
        const rules = block.attrs?.rules || block.rules || {};
        return Object.keys(rules).length > 0;
      });

      // If any block has rules → false, if no blocks have rules → true
      const isValid = !hasBlockWithRules;

      on_validation_change(isValid);
      validatedStepRef.current = step;
    });

    return () => cancelAnimationFrame(rafId);
  }, [step, currentStep, maxReachedStep, on_validation_change, bookingFormManager, currentStepSection, stepFormData]);

  // Regular step rendering
  return (
      <div className="cs-container cs-grid items-center gap-y-7 large:gap-y-10">

        <div className={`col-span-full ${step > 1 ? 'medium:self-start medium:col-[1/span_9]' : ''} mt-30p`}>
          {!is_summary_step && (
            <div className={`${step === 1 ? 'text-center' : ''} w-11/12 aff-step-desc af-p30-light text-black`} dangerouslySetInnerHTML={{ __html: excerpt || '' }}></div>
          )}

          {is_summary_step ? (
            <SummarySection
              form_data={form_data}
              errorManager={errorManager}
              sections={sections}
              on_validation_change={on_validation_change}
              on_edit_step={on_edit_step}
            />
          ) : (
            <div className="acf-innerblocks-container">
              {sections[step] && sections[step].length > 0 ? (
                sections[step].map((block, index) => {
                  return (
                    <BlockRenderer
                      key={`${block.blockName}-${index}`}
                      block_data={block}
                    />
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 af-p20">
                    {__('No content configured for step {step}', 'wpcbooking').replace('{step}', step)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {step > 1 && (
          <div className="col-span-full medium:col-[10/span_3] self-start relative">
            {/* BG ELEMENT */}
            <div className="col-span-full medium:col-[10/span_3] self-start relative z-0">
            <div 
              className="absolute left-0 top-0 w-full h-[120vh] bg-no-repeat bg-left-top pointer-events-none"
              style={{
                backgroundImage: `url(${window.location.origin}/wp-content/themes/bartender/assets/img/form/form-step-bg.svg)`,
                backgroundSize: 'auto 100%',
                zIndex: -1
              }}
            />
            </div>

            
            <div className="flex items-start justify-center medium:justify-start relative z-10">
              <GlassComponent
                step={(step-1)}
              />
            </div>
          </div>
        )}
      </div>
  );
};

export default BookingSection;
