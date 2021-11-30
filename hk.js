const puppeteer = require("puppeteer"); 

const codeObj=require('./codes') 
const link='https://www.hackerrank.com/auth/login'
const email='Dummy_id'
const pw= 'Dummypassword'

const browserOpen=puppeteer.launch(      
    {headless: false, args:['--start-maximized'], 
    slowMo: true,
    defaultViewport: null})

let page

    browserOpen.then(function(browserObj) 
    {
        let browserOpenPromise = browserObj.newPage() 
        return browserOpenPromise;
    }).then(function(newTab)
    {
        page=newTab
        let hackerranOpen=newTab.goto(link)
        return hackerranOpen
    }).then(function()
    {
        let enterEmail=page.type("input[id='input-1']",email,{delay: 50})
        return enterEmail
    }).then(function()
    {
        let enterPassword=page.type("input[id='input-2']",pw,{delay: 50})
        return enterPassword
    }).then(function()
    {
        let loginButtonClick=page.click('button[data-analytics="LoginPassword"]',{delay: 50})
        return loginButtonClick
    }).then(function(){
        let clickOnCppPromise = waitAndClick('.topic-card div[data-automation="cpp"]',page)
        return clickOnCppPromise
    }).then(function(){
        let clickIntro = waitAndClick('input[value="cpp-introduction"]',page)
        return clickIntro
    }).then(function(){
        let waitfor3sec= page.waitFor(3000) 
        return waitfor3sec
    }).then(function(){
        let totalQues = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})    
        return totalQues;                            
    }).then(function(QuesArr){
        console.log('Number of Question ',QuesArr.length)
 
        let QuestionWillBeSOlved = questionSolver(page,QuesArr[0],codeObj.answers[1])
        return QuestionWillBeSOlved
    })
    // class="ui-btn ui-btn-normal primary-cta ui-btn-primary ui-btn-styled"

    function waitAndClick(selector,cPage)
    {
        return new Promise(function(resolve,reject){
            let waitforModelPromise = cPage.waitForSelector(selector) 
             waitforModelPromise.then(function(){  
            let clickModel = cPage.click(selector)
            return clickModel
            }).then(function(){
                resolve()  
            }).catch(function(err){
              reject()
            })
        })
    }

    function questionSolver( page,question,answer)  
    {
        return new Promise(function(resolve,reject)
        {
         let QuesWillBeClick = question.click()  
         QuesWillBeClick.then(function(){
             let Editorinfocus = waitAndClick('.view-lines',page)  
             return Editorinfocus
         }).then(function(){  
            return waitAndClick('.checkbox-input',page)
         }).then(function(){  
             return page.waitForSelector('textarea.custominput',page)
         }).then(function(){
             return page.type('textarea.custominput',answer,{delay: 10})  
         
         }).then(function () {
            let pressctrl = page.keyboard.down('Control'); 
            return pressctrl;
        }).then(function () {
            let pressA = page.keyboard.press('A', { delay: 100});
            return pressA;
        }).then(function () {
            let pressX = page.keyboard.press('X', { delay: 100 });
            return pressX;
        }).then(function () {
            let releaseControl = page.keyboard.up('Control'); 
            return releaseControl;
        }).then(function () {
            let mainEditorinfocus = waitAndClick('.view-lines', page);
            return mainEditorinfocus;
        }).then(function () {
            let pressctrl = page.keyboard.down('Control');
            return pressctrl;
        }).then(function () {
            let pressA = page.keyboard.press('A', { delay: 10 });
            return pressA;
        }).then(function () {
            let pressV = page.keyboard.press('V', { delay: 10 });
            return pressV;
        }).then(function () {
            let releaseControl = page.keyboard.up('Control'); 
            return releaseControl;
        }).then(function () {
            return page.click('.hr-monaco__run-code', { delay: 50 });
      
        }).then(function () {
            let delayfor10sec = page.waitFor(10000);
            return delayfor10sec;
        }).then(function () {
            let submit = waitAndClick('.hr-monaco-submit', page);
            return submit;
        }).then(function(){
            resolve()
        }).then(function(err){
            reject();
        })  
        })
    }
