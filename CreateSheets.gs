//line 23 and 24 have HARD CODED indexes
const createSheets1 = () => {
  //get info for the properties
  const URL = SpreadsheetApp.getActiveSpreadsheet().getUrl()
  const tab = Settings1.propsTab

  //get the properties and the values
  let propsInfo = new MySheet({ sheetURL: URL, tabName: tab })
  let propValues = propsInfo.values

  //get the save folder and the sheet template
  try {
    //check for folder id
    if (!propValues[Settings1.saveFolder.row][Settings1.saveFolder.col]) { throw new Error("Missing folder ID.") }
    let saveFolder = DriveApp.getFolderById(propValues[Settings1.saveFolder.row][Settings1.saveFolder.col])

    //check for template sheet id
    if (!propValues[Settings1.template.row][Settings1.template.col]) { throw new Error("Missing template ID.") }
    let template = DriveApp.getFileById(propValues[Settings1.template.row][Settings1.template.col])
    
    //loop through each building, create sheet from template, save it, add url to values
    propsInfo.data.forEach((row, index) => {
      let newSheet = template.makeCopy(propValues[index + 1][0], saveFolder)
      propValues[index+1][1] = newSheet.getUrl()
    })
    //save the values back to the sheet that now has the URLs
    propsInfo.saveValues(propValues)

  } catch (error) {
    showMessage(error,"fail")
    logIt({
      level: "severe",
      theMsg: error,
      error: error
    })
    return error
  }

    logIt({
      level: "info",
      theMsg: "No errors creating sheets",
    })

  return "done"


}
//so it can be called from a library...
var createSheets = createSheets1