# FluentCRM Integration - Hospital Management System

This directory contains the FluentCRM integration for the Hospital Management System. It provides automation capabilities for hospital-related workflows, including triggers, actions, and conditions.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Triggers](#triggers)
- [Actions](#actions)
- [Conditions](#conditions)
- [Working with Automation](#working-with-automation)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Overview

The FluentCRM integration enables automated workflows for hospital management operations. It consists of three main components:

- **Triggers**: Events that start automation workflows
- **Actions**: Operations performed during automation
- **Conditions**: Logic that determines workflow paths

## Architecture

```
fluent-crm/
├── FluentCRMIntegration.php    # Main integration class
├── Triggers/                   # Event triggers
├── Actions/                    # Automation actions
├── Conditions/                 # Conditional logic
├── Services/                   # Business logic services
├── Traits/                     # Shared functionality
└── Scripts/                    # Additional scripts
```

## Triggers

Triggers are events that initiate automation workflows. They are defined in the `Triggers/` directory.

### Available Triggers

#### 1. Hospital Create/Update Trigger (`hospitalCreateUpdateTrigger.php`)

**Trigger Name**: `nbh_hospital_create_update`

**Description**: Fires when a hospital is created or updated.

**Settings**:
- `hospital_event`: Select which event triggers the funnel (create/update)
- `send_email_to`: Choose recipient (creator/all)
- `run_multiple`: Whether to run multiple times

**Usage Example**:
```php
// Trigger the funnel manually
do_action('nbh_hospital_create_update', $hospital_id, $post, $update, $send_email_to);
```

#### 2. Hospital Status Trigger (`hospitalStatusTrigger.php`)

**Trigger Name**: `nbh_hospital_statuses`

**Description**: Fires when hospital status changes.

**Available Statuses**:
- `empty_hospital`: Hospital has no equipment
- `unequipped_hospital`: Hospital has some equipment but not complete
- `completed_hospital`: Hospital is fully equipped

#### 3. Hospital Karma Trigger (`hospitalKarmaTrigger.php`)

**Trigger Name**: `nbh_hospital_karma`

**Description**: Fires when hospital karma status changes.

**Available Karma Statuses**:
- `karma_not_started`: Karma system not initiated
- `karma_started`: Karma system in progress
- `karma_completed`: Karma system completed

## Actions

Actions are operations performed during automation workflows. They are defined in the `Actions/` directory.

### Available Actions

#### 1. Apply Hospital Tag Action (`applyHospitalTagAction.php`)

**Action Name**: `nbh_apply_hospital_tag`

**Description**: Applies tags to hospitals based on automation conditions.

**Settings**:
- `hospital_status`: Array of status tags to apply

**Usage**: Automatically applies status tags when triggered by hospital events.

#### 2. Apply Hospital Karma Action (`applyHospitalKarmaAction.php`)

**Action Name**: `nbh_apply_hospital_karma`

**Description**: Applies karma tags to hospitals based on automation conditions.

**Settings**:
- `hospital_karma`: Array of karma tags to apply

**Usage**: Automatically applies karma tags when triggered by hospital events.

#### 3. Wait Time Action (`WaitTimeAction.php`)

**Action Name**: `nbh_wait_time`

**Description**: Adds delays in automation workflows.

**Settings**:
- `wait_time`: Duration to wait
- `wait_unit`: Time unit (minutes, hours, days)

#### 4. WooCommerce Order Actions

- **WooOrderWaitAction**: Waits for WooCommerce orders
- **WaitWooOrderStatusAction**: Waits for specific order status

## Conditions

Conditions provide conditional logic for automation workflows. They are defined in the `Conditions/` directory.

### Available Conditions

#### 1. Hospital Status Condition (`hospitalStatusCondition.php`)

**Group**: `hospital`

**Condition**: `HospitalStatus`

**Available Options**:
- `empty_hospital`
- `unequipped_hospital`
- `completed_hospital`

**Usage**: Check current hospital status in automation workflows.

#### 2. Hospital Karma Condition (`hospitalKarmaCondition.php`)

**Group**: `hospital`

**Condition**: `HospitalKarma`

**Available Options**:
- `karma_not_started`
- `karma_started`
- `karma_completed`

#### 3. Emergency Aid Contribution Condition (`emergencyAidContributionCondition.php`)

**Group**: `emergency_aid`

**Condition**: `EmergencyAidContribution`

**Usage**: Check emergency aid contribution status.

## Working with Automation

### Creating a New Automation Workflow

1. **Access FluentCRM Dashboard**
   - Navigate to FluentCRM → Automations
   - Click "Create New Automation"

2. **Select Trigger**
   - Choose from available hospital triggers
   - Configure trigger settings

3. **Add Conditions** (Optional)
   - Use conditions to create branching logic
   - Set up different paths based on hospital status

4. **Configure Actions**
   - Add actions to perform operations
   - Set up delays, tags, or other actions

5. **Test and Activate**
   - Test the automation with sample data
   - Activate when ready

### Example Workflow: Hospital Completion Notification

```
Trigger: Hospital Status Change
├── Condition: Status = "completed_hospital"
│   ├── Action: Send Email to Creator
│   └── Action: Apply "Completed" Tag
└── Condition: Status = "unequipped_hospital"
    ├── Action: Send Reminder Email
    └── Action: Apply "In Progress" Tag
```

### Best Practices

1. **Use Descriptive Names**: Name your automations clearly
2. **Test Thoroughly**: Always test with sample data
3. **Monitor Performance**: Check automation metrics regularly
4. **Use Conditions Wisely**: Avoid overly complex branching
5. **Document Workflows**: Keep notes on automation purposes

## Configuration

### Constants

The integration uses several constants defined in `FluentCRMIntegration.php`:

```php
// ACF Field IDs
public const ACF_EMAIL = 'field_67d960b98941b';
public const ACF_HOSPITAL_NAME = 'field_67d95e0ea9de0';
public const ACF_STATUS_NAME = 'tag_hospital_status';
public const ACF_KARMA_NAME = 'tag_hospital_karma';

// Hospital Statuses
public const STATUS_EMPTY = 'empty_hospital';
public const STATUS_UNEQUIPPED = 'unequipped_hospital';
public const STATUS_COMPLETED = 'completed_hospital';

// Karma Statuses
public const KARMA_NOT_STARTED = 'karma_not_started';
public const KARMA_STARTED = 'karma_started';
public const KARMA_COMPLETED = 'karma_completed';
```

### Services

The integration uses several services for business logic:

- **HospitalService**: Manages hospital operations
- **ContactService**: Handles contact management
- **SmartCodeService**: Manages smart codes
- **CronService**: Handles scheduled tasks
- **HookService**: Manages WordPress hooks

## Troubleshooting

### Common Issues

1. **Automation Not Triggering**
   - Check if FluentCRM plugin is active
   - Verify trigger conditions are met
   - Check WordPress error logs

2. **Actions Not Executing**
   - Verify action settings are correct
   - Check if required data is available
   - Review automation flow logic

3. **Conditions Not Working**
   - Ensure condition data is properly formatted
   - Check if condition group is available for trigger
   - Verify condition assessment logic

### Debugging

1. **Enable Debug Logging**
   ```php
   // Add to wp-config.php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   ```

2. **Check FluentCRM Logs**
   - Navigate to FluentCRM → Tools → Logs
   - Review automation execution logs

3. **Test Individual Components**
   - Test triggers manually
   - Verify action execution
   - Check condition assessment

### Support

For technical support or questions about the FluentCRM integration:

1. Check this documentation first
2. Review WordPress error logs
3. Contact the development team with specific error details

## Development

### Adding New Triggers

1. Create new trigger class in `Triggers/` directory
2. Extend `BaseTrigger` class
3. Implement required methods
4. Register trigger in `HookService`

### Adding New Actions

1. Create new action class in `Actions/` directory
2. Extend `BaseAction` class
3. Implement required methods
4. Add action to trigger compatibility

### Adding New Conditions

1. Create new condition class in `Conditions/` directory
2. Implement condition assessment logic
3. Register condition group
4. Add condition options

### Code Standards

- Follow PSR-4 autoloading standards
- Use snake_case for method and variable names
- Include proper doc comments for all methods
- Follow WordPress coding standards
- Test all new functionality thoroughly

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Author**: radek.chaloupka@artevio.com 