class MySheet {
  /**
   * The constructor function
   * @param {object} info  The info object
   * @param {string} info.sheetURL  The url to the spreadsheet
   * @param {string} info.tabName The name of the tab that has all the values
   * 
   */
  constructor (info){
    let {sheetURL, tabName} = info
    const ss = SpreadsheetApp.openByUrl(sheetURL)
    const tab = ss.getSheetByName(tabName)

    this._tab = tab
  }

  /**Getters */
  //the tab
  get tab (){
    return this._tab
  }
  //the dataRange on the tab
  get dataRange (){
    return this.tab.getDataRange()
  }
  // get currently cached values
  get values () {
    // if we dont have any then get some
    return this._values || this.getValues()
  }
  // get values from sheet
  getValues () {
    // caching for later
    this._values = this.dataRange.getValues()
    return this._values
  }
  //get just headers
  get headers (){
    //if we dont have any then get them
    return this._headers || this.getHeadersAndData().headers;
  }
  //get just the data
  get data (){
    return this._data || this.getHeadersAndData().data;
  }
    //get the header row and rest of the data at one time
  getHeadersAndData () {
    let [headers, ...data]=this._values || this.getValues();
    this._headers = headers;
    this._data = data;
    return {headers,data}
  }
  //one setter
  set values (val) {
    this._values = val
  }
  //replace the values on the tab with the new values
  saveValues (values) {
    if (values) {
      this.values = values
    }
    this._tab.getDataRange().clear()
    //if we have data add it
    if(values.length && values[0] && values[0].length) {
      const range = this.tab.getRange(1,1,values.length,values[0].length)
      return range.setValues(values)
    }
  }

}
//this was needed. see this site https://stackoverflow.com/questions/66440917/can-i-use-class-objects-in-google-apps-script-libraries
//Preliminary thought is it is like the hoops you need to jump through for using namespaces in library
  /**
   * The constructor function
   * @param {object} info  The info object newMySheet(info: { sheetURL: string; tabName: string; }): MySheet
   * @param {string} info.sheetURL  The url to the spreadsheet
   * @param {string} info.tabName The name of the tab that has all the values
   * 
   */
function newMySheet(info){
  return new MySheet(info)
}

const test1 =()=>{
  let theInfo = {}
  theInfo.sheetURL = "https://docs.google.com/spreadsheets/d/1kTtB0poCk_qOIpN2ecDM1jxIXLd0PpvAZlgbATW5PL8/edit#gid=31942695"
  theInfo.tabName = "classWork"

  let workTab = new MySheet(theInfo)
  let r = new MySheet()
  let dt = workTab.dataRange.getA1Notation()
  console.log(dt);
  
}