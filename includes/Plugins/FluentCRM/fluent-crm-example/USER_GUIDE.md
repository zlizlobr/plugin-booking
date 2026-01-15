# FluentCRM Automation User Guide - Hospital Management System

This guide is designed for users who will create and manage automation workflows in FluentCRM for the Hospital Management System. It provides step-by-step instructions for setting up effective automation campaigns.

## Table of Contents

- [Getting Started](#getting-started)
- [Understanding Automation Components](#understanding-automation-components)
- [Creating Your First Automation](#creating-your-first-automation)
- [Hospital-Specific Triggers](#hospital-specific-triggers)
- [Setting Up Conditions](#setting-up-conditions)
- [Configuring Actions](#configuring-actions)
- [Best Practices](#best-practices)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Getting Started

### What is FluentCRM Automation?

FluentCRM automation allows you to create automated workflows that respond to specific events in your hospital management system. These workflows can send emails, apply tags, create delays, and perform other actions automatically.

### Key Benefits

- **Save Time**: Automate repetitive tasks
- **Improve Engagement**: Send timely, relevant communications
- **Better Organization**: Keep track of hospital statuses automatically
- **Enhanced User Experience**: Provide immediate responses to user actions

### Prerequisites

Before creating automations, ensure you have:
- FluentCRM plugin installed and activated
- Proper permissions to access the automation dashboard
- Understanding of your hospital management workflow

## Understanding Automation Components

### 1. Triggers
Triggers are events that start your automation workflow. Think of them as the "when" part of your automation.

**Available Hospital Triggers:**
- **Hospital Create/Update** (`nbh_hospital_create_update`): Fires when a new hospital is created or existing one is updated
- **Hospital Status Changed** (`nbh_hospital_statuses`): Fires when hospital equipment status changes (empty → unequipped → completed)
- **Hospital Karma Status Changed** (`nbh_hospital_karma`): Fires when karma system status changes

### 2. Conditions
Conditions help you create branching logic in your automation. They determine which path the automation should follow.

**Available Conditions:**
- **Hospital Status**: Check if hospital is empty, unequipped, or completed (only available for karma triggers)
- **Hospital Karma**: Check karma system status (only available for status triggers)

### 3. Actions
Actions are what your automation actually does. These are the "then" part of your automation.

**Available Actions:**
- **Apply Hospital Tag**: Add status tags to hospitals
- **Apply Hospital Tag**: Add karma tags to hospitals
- **Wait Time**: Add delays between actions with various wait types

## Creating Your First Automation

### Step 1: Access the Automation Dashboard

1. Log into your WordPress admin panel
2. Navigate to **FluentCRM** → **Automations**
3. Click **"Create New Automation"**

### Step 2: Choose Your Trigger

1. Select a trigger from the available options
2. For hospital management, choose one of these:
   - **Create/Update Hospital**
   - **Status Hospital**
   - **Status Karma**

3. Configure trigger settings:
   - **Hospital Event**: Choose create, update, or both (for create/update trigger)
   - **Hospital Status**: Select specific statuses to trigger on (for status trigger)
   - **Hospital Karma**: Select karma statuses to trigger on (for karma trigger)
   - **Run Multiple**: Choose whether automation can run multiple times

### Step 3: Add Conditions (Optional)

1. Click the **"+"** button to add a condition
2. Select **"Hospital"** from the condition groups
3. Choose the specific condition based on your trigger:
   - **Hospital Status**: For karma triggers
   - **Hospital Karma Status**: For status triggers  
   - **Emergency Aid Contribution**: For all triggers
4. Set the condition value and operator

### Step 4: Configure Actions

1. Click the **"+"** button to add an action
2. Choose from available actions:
   - **Send Email**: Configure email content and recipients
   - **Apply Tag to the Hospital**: Select hospital status tags to apply
   - **Apply Karma Tag to the Hospital**: Select hospital karma tags to apply
   - **Hospital: Wait X Days/Hours**: Set delay duration with various wait types

### Step 5: Test and Activate

1. **Test Your Automation**:
   - Use the test feature to simulate the automation
   - Check that emails are sent correctly
   - Verify tags are applied properly

2. **Activate the Automation**:
   - Click **"Activate"** when satisfied with the setup
   - Monitor the automation's performance

## Hospital-Specific Triggers

### Hospital Create/Update Trigger

**Trigger Name**: `nbh_hospital_create_update`

**When to Use**: When you want to respond to new hospital creation or updates.

**Common Use Cases**:
- Welcome emails for new hospitals
- Notification emails when hospitals are updated
- Automatic tag assignment

**Configuration Options**:
- **Hospital Event**: Choose between "Hospital Created" or "Hospital Updated"
- **Send Email To**: "Tvůrci" (creator) or "Všem v nemocnici" (all contacts)
- **Run Multiple**: "No" (recommended for welcome emails)

### Hospital Status Trigger

**Trigger Name**: `nbh_hospital_statuses`

**When to Use**: When you want to respond to changes in hospital equipment status.

**Available Statuses**:
- **Prázdná nemocnice** (`empty_hospital`): Hospital has no equipment
- **Nevybavená nemocnice** (`unequipped_hospital`): Hospital has some equipment but not complete
- **Dokončená nemocnice** (`completed_hospital`): Hospital is fully equipped

### Hospital Karma Trigger

**Trigger Name**: `nbh_hospital_karma`

**When to Use**: When you want to respond to changes in hospital karma status.

**Available Karma Statuses**:
- **Karma nezapočala** (`karma_not_started`): Karma system not initiated
- **Karma započala** (`karma_started`): Karma system in progress


**Common Use Cases**:
- Karma progress notifications
- Karma completion celebrations
- Reminder emails for karma progression

**Common Use Cases**:
- Progress notifications
- Completion celebrations
- Reminder emails for incomplete hospitals

### Hospital Karma Trigger

**Trigger Name**: `nbh_hospital_karma`

**When to Use**: When you want to respond to karma system participation.

**Available Karma Statuses**:
- **Karma nezapočala** (`karma_not_started`): User hasn't started karma system
- **Karma započala** (`karma_started`): User is participating in karma system

**Common Use Cases**:
- Karma system introduction emails
- Progress tracking
- Completion rewards

## Setting Up Conditions

### Why Use Conditions?

Conditions help you create more targeted and relevant automations by ensuring actions only happen when specific criteria are met.

### Available Conditions by Trigger

**For Hospital Status Triggers**:
- **Hospital Karma Status**: Check karma system status
- **Emergency Aid Contribution**: Check contribution status

**For Hospital Karma Triggers**:
- **Hospital Status**: Check hospital equipment status
- **Emergency Aid Contribution**: Check contribution status

**For Hospital Create/Update Triggers**:
- **Emergency Aid Contribution**: Check contribution status

### Creating Conditional Logic

1. **Simple Conditions**:
   ```
   IF Hospital Status = "completed_hospital"
   THEN Send Completion Email
   ```

2. **Multiple Conditions**:
   ```
   IF Hospital Status = "completed_hospital" 
   AND Emergency Aid Contribution = "yes"
   THEN Send Full Completion Email
   ```

3. **Conditional Branching**:
   ```
   IF Hospital Status = "completed_hospital"
   ├── THEN Send Completion Email
   └── ELSE Send Reminder Email
   ```

### Condition Best Practices

- **Keep it Simple**: Avoid overly complex condition chains
- **Test Thoroughly**: Always test conditions with sample data
- **Use Clear Names**: Name your conditions descriptively
- **Document Logic**: Keep notes on why conditions were set up

## Configuring Actions

### Email Actions

**Setting Up Email Content**:
1. Choose email template or create new one
2. Use SmartCodes for personalization:
   - `{hospital.name}` - Hospital name
   - `{contact.first_name}` - Contact first name
   - `{hospital.status}` - Current hospital status

**Email Best Practices**:
- Keep subject lines clear and compelling
- Use personalization to increase engagement
- Include clear call-to-action buttons
- Test email rendering across devices

### Apply Hospital Tag Actions

**Applying Hospital Tags**:
1. Select the "Apply Tag to the Hospital" action
2. Choose from available status tags:
   - Empty Hospital
   - Unequipped Hospital
   - Completed Hospital

**Tag Management**:
- Tags help organize and segment hospitals
- Use tags for reporting and filtering
- Avoid creating too many similar tags

### Wait Time Actions

**Setting Up Delays**:
1. Choose "Hospital: Wait X Days/Hours" action
2. Select wait type:
   - **Wait by period**: Set specific time duration
   - **Wait Until Date**: Wait until specific date/time
   - **Wait by Weekday**: Wait until specific weekday
   - **Wait by Custom Field**: Wait based on custom field value
   - **Wait by Order**: Wait based on WooCommerce order status

**Wait Time Configuration**:
- **Wait by period**: Set amount and unit (minutes, hours, days)
- **Wait Until Date**: Specify exact date and time
- **Wait by Weekday**: Choose weekday and time
- **Wait by Custom Field**: Select custom field and date format
- **Wait by Order**: Choose order status and time period

**Delay Best Practices**:
- Don't send emails too frequently
- Consider user time zones
- Use delays to create natural conversation flow

## Best Practices

### Automation Design

1. **Start Simple**: Begin with basic automations and add complexity gradually
2. **Clear Objectives**: Define what each automation should accomplish
3. **User-Centric**: Focus on providing value to users
4. **Test Everything**: Always test before activating

### Email Best Practices

1. **Personalization**: Use SmartCodes to personalize content
2. **Clear Subject Lines**: Make subject lines descriptive and compelling
3. **Mobile-Friendly**: Ensure emails look good on mobile devices
4. **Unsubscribe Option**: Always include unsubscribe links

### Performance Optimization

1. **Monitor Metrics**: Track open rates, click rates, and conversions
2. **A/B Testing**: Test different subject lines and content
3. **Segment Wisely**: Use conditions to target specific audiences
4. **Regular Review**: Periodically review and optimize automations

### Compliance

1. **GDPR Compliance**: Ensure proper consent and data handling
2. **Unsubscribe Management**: Honor unsubscribe requests promptly
3. **Data Privacy**: Only collect and use necessary data
4. **Documentation**: Keep records of automation purposes and data usage

## Common Use Cases

### 1. New Hospital Welcome Sequence

**Trigger**: Hospital Create/Update (Hospital Created)
**Actions**:
1. Send welcome email immediately
2. Wait 2 days
3. Send follow-up email with tips
4. Wait 1 week
5. Send progress check email

### 2. Hospital Completion Celebration

**Trigger**: Hospital Status Changed
**Condition**: Status = "completed_hospital"
**Actions**:
1. Send completion celebration email
2. Apply "Completed" tag
3. Send social sharing request

### 3. Karma System Engagement

**Trigger**: Hospital Karma Status Changed
**Conditions**:
- If Karma = "karma_started" → Send progress email
- If Karma = "KARMA_NOT_STARTED" → Send not start reward

### 4. Incomplete Hospital Reminders

**Trigger**: Hospital Status Changed
**Condition**: Status = "unequipped_hospital"
**Actions**:
1. Send reminder email
2. Wait 3 days
3. Send follow-up reminder
4. Wait 1 week
5. Send final reminder

## Troubleshooting

### Common Issues

**Automation Not Triggering**:
- Check if trigger conditions are met
- Verify automation is activated
- Check WordPress error logs
- Ensure FluentCRM plugin is active

**Emails Not Sending**:
- Check email settings in FluentCRM
- Verify SMTP configuration
- Check spam/junk folders
- Review email delivery logs

**Tags Not Applying**:
- Verify tag action configuration
- Check if tags exist in FluentCRM
- Review automation execution logs
- Test with sample data

**Conditions Not Working**:
- Double-check condition logic
- Verify condition data is available
- Test conditions individually
- Review condition assessment logs

**Wait Times Not Working**:
- Check wait time configuration
- Verify date/time formats
- Review cron job settings
- Check automation execution logs

### Getting Help

1. **Check Documentation**: Review this guide and [official FluentCRM docs](https://fluentcrm.com/docs/)
2. **Review Logs**: Check FluentCRM logs for error messages
3. **Test Components**: Test triggers, conditions, and actions separately
4. **Contact Support**: Reach out to your development team with specific details

### Debugging Steps

1. **Enable Debug Mode**:
   - Go to FluentCRM → Settings → General
   - Enable debug logging

2. **Check Execution Logs**:
   - Navigate to FluentCRM → Tools → Logs
   - Review automation execution history

3. **Test with Sample Data**:
   - Create test hospitals to trigger automations
   - Monitor automation behavior

4. **Verify Data Flow**:
   - Check that trigger data is being passed correctly
   - Verify condition assessment is working
   - Confirm actions are receiving proper data

---

## Quick Reference

### Trigger Names
- `nbh_hospital_create_update` - Hospital create/update events
- `nbh_hospital_statuses` - Hospital status changes
- `nbh_hospital_karma` - Hospital karma status changes

### Common SmartCodes
- `{hospital.name}` - Hospital name
- `{contact.first_name}` - Contact first name
- `{hospital.status}` - Current hospital status
- `{hospital.karma_status}` - Current karma status

### Status Values
- **Hospital Status**: `empty_hospital`, `unequipped_hospital`, `completed_hospital`
- **Karma Status**: `karma_not_started`, `karma_started`

### Wait Time Types
- **unit_wait**: Wait by specific time period
- **timestamp_wait**: Wait until specific date/time
- **to_day**: Wait until specific weekday
- **by_custom_field**: Wait based on custom field
- **order_wait**: Wait based on WooCommerce order

---

**Need Help?** Contact your development team or refer to the [official FluentCRM documentation](https://fluentcrm.com/docs/) for additional resources.

**Version**: 1.0.0  
**Last Updated**: 2025  
**For**: Hospital Management System Users 