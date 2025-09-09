//line 18 and 21 are HARD CODED indexes
const UpdateSheets = () => {

  try {
    //get info for the properties
    const URL = SpreadsheetApp.getActiveSpreadsheet().getUrl()
    const propsTab = Settings1.propsTab
    const dataTab = Settings1.dataTab

    //get the data tab
    let dataInfo = new MySheet({ sheetURL: URL, tabName: dataTab })
    //get the properties tab
    let propsInfo = new MySheet({ sheetURL: URL, tabName: propsTab })
    //separate the headers and data from the new values
    let [headersValues, ...dataValues] = dataInfo.values

    propsInfo.data.forEach(row =>{
      let temp = dataValues.filter(row1 => {
        return row1[Settings1.bldgFltrCol]==row[0]
      })
      let bldgSheet = newMySheet({sheetURL: row[1],tabName:Settings1.bldgDataTab})
      temp.unshift(headersValues)
      bldgSheet.saveValues(temp)
    })


  } catch (error) {
    
    logIt({
      level: "severe",
      theMsg: error,
      error: error
    })
    return error
  }

    logIt({
      level: "info",
      theMsg: "No errors updating sheets",
    })
  return "done"

}

//so it can be called from a library...
var updateSheets = UpdateSheets