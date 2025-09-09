# mroGiftedDBlib

A Google Apps Script library for managing gifted student databases across multiple school buildings. This library automates the creation and updating of individual building spreadsheets from a master database.

## Features

- **Automated Sheet Creation**: Creates individual building sheets from a template
- **Data Synchronization**: Updates building sheets with filtered data based on building assignments
- **Error Handling**: Comprehensive logging and error reporting
- **Menu Integration**: Adds custom menu items to spreadsheets for easy access

## Installation

1. In your Google Apps Script project, go to **Libraries** in the left sidebar
2. Add this library using the Script ID: `[YOUR_SCRIPT_ID_HERE]`
3. Select the latest version and save
4. Add the library identifier: `mroGiftedDBlib`

## Setup Requirements

Your master spreadsheet must have the following structure:

### Required Sheets

1. **giftedInfo** - Contains the main student data
2. **props** - Contains configuration properties

### Props Sheet Structure

The `props` sheet should contain:
- **Row 2, Column C**: Save folder ID (Google Drive folder where building sheets will be saved)
- **Row 2, Column D**: Template sheet ID (Google Sheets template to copy for each building)

### Data Sheet Structure

Your `giftedInfo` sheet should have:
- **Column D** (index 3): Building identifier for filtering data

## Usage

### Adding to Your Spreadsheet

Add this function to your Google Apps Script project:

```javascript
function onOpen() {
  mroGiftedDBlib.onOpen()
}
```

This will add a custom menu with two options:
- **Create Building Sheets**: Creates new sheets for each building
- **Update Building Sheets**: Updates existing building sheets with current data

### Manual Function Calls

You can also call the functions directly:

```javascript
// Create building sheets
function createSheets() {
  return mroGiftedDBlib.create()
}

// Update building sheets
function updateSheets() {
  return mroGiftedDBlib.update()
}
```

## Required OAuth Scopes

Add these scopes to your `appsscript.json` file:

```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```

## How It Works

### Create Building Sheets
1. Reads the properties from the `props` sheet
2. Gets the save folder and template sheet from Google Drive
3. For each building in your data, creates a copy of the template
4. Saves the new sheets to the specified folder
5. Updates the `props` sheet with URLs to the new building sheets

### Update Building Sheets
1. Reads data from the `giftedInfo` sheet
2. Filters data by building (using column D)
3. Updates each building sheet with its filtered data
4. Preserves headers in each building sheet

## Error Handling

The library includes comprehensive error handling and logging:
- All errors are logged using the mroBBLog library
- User-friendly error messages are displayed
- Success confirmations are shown after operations complete

## Dependencies

This library depends on:
- **mroBBLog** - For logging functionality (automatically included)

## Example Workflow

1. Set up your master spreadsheet with student data
2. Create a template sheet with the desired format
3. Add the save folder ID and template ID to your props sheet
4. Run "Create Building Sheets" to generate individual building spreadsheets
5. Use "Update Building Sheets" whenever you need to sync new data

## Support

For issues or questions, please check the error logs in your designated logging spreadsheet or contact the library maintainer.
