function onOpen() {
  let ui = SpreadsheetApp.getUi()
  ui.createMenu('Gifted DB')
    .addItem("Update Building Sheets","mroGiftedDBlib.update")
    .addItem("Create Building Sheets","mroGiftedDBlib.create")
    .addToUi()
}

const update_ = ()=>{
  try {
    let rslt = UpdateSheets()
    if(rslt !="done"){throw new Error("There was an error updating the buidling sheets.")}
    showMessage("Building Sheets Updated!","good")
  } catch (error) {
      showMessage(error,"fail")
      logIt({
      level: "severe",
      theMsg: error,
      error: error
    })
  }
}

const create_ = ()=>{
  try {
    let rslt = createSheets1()
    if(rslt != "done"){throw new Error("There was an error creating the buidling sheets.")}
    showMessage("Building Sheets Created!","good")
  } catch (error) {
      showMessage(error,"fail")
      logIt({
      level: "severe",
      theMsg: error,
      error: error
    })
  }
}


const showMessage =(message,reason)=>{
  let title = (reason == "fail")?"Something went Wrong":"All Good!"
  let ui = SpreadsheetApp.getUi()
  ui.alert(title,message,ui.ButtonSet.OK)
}

//needed because we are in a library
var update = update_
var create = create_