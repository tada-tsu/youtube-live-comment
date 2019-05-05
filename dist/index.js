// import puppeteer from "puppeteer"
// import YoutubeLiveCommentOnPage from "./onPage.js"
// class YoutubeLiveComment {
//     /**
//      *Creates an instance of YoutubeLiveComment.
//      * @param {array} [cookie=[]]
//      * @memberof YoutubeLiveComment
//      */
//     constructor(cookie = []) {
//         this.dashBoardURL = "https://www.youtube.com/live_dashboard"
//         if (cookie.length > 0) {
//             this.cookie = cookie
//         }
//         this.comments = []
//         this.newComments = []
//     }
//     /**
//      *
//      *
//      * @returns {Promise} 
//      * @memberof YoutubeLiveComment
//      */
//     initDashBoard() {
//         return new Promise(async resolve => {
//             this.mainBrowser = await puppeteer.launch()
//             this.mainPage = (await this.mainBrowser.pages())[0]
//             if (typeof this.cookie != "undefined") {
//                 await this.mainPage.setCookie(...this.cookie)
//             }
//             this.mainPage.once("load", async () => {
//                 if (this.isLoginPage(this.mainPage.url())) {
//                     this.cookie = await this.login()
//                 }
//                 if (typeof this.cookie != "undefined") {
//                     await this.mainPage.setCookie(...this.cookie)
//                     await this.mainPage.goto(this.dashBoardURL)
//                 }
//                 await this.mainPage.evaluate((YoutubeLiveCommentOnPageString) => {
//                     return eval(`
//                         ${YoutubeLiveCommentOnPageString}
//                         window.YoutubeLiveComment = new YoutubeLiveComment() 
//                         `)
//                 }, YoutubeLiveCommentOnPage.toString())
//                 resolve()
//             })
//             await this.mainPage.goto(this.dashBoardURL)
//         })
//     }
//     async goDashBoard() {
//         return await this.mainPage.goto(this.dashBoardURL)
//     }
//     isLoginPage(url) {
//         return /^https:\/\/accounts\.google\.com\/ServiceLogin/.test(url) || /^https:\/\/accounts\.google\.com\/signin\//.test(url)
//     }
//     login() {
//         return new Promise(async (resolve) => {
//             this.noHeadlessBrowser = await puppeteer.launch({
//                 headless: false,
//             })
//             const loggedInCheckHandler = () => {
//                 if (this.loginPage.url() == this.dashBoardURL) {
//                     this.loginPage.cookies().then(async res => {
//                         await this.noHeadlessBrowser.close()
//                         resolve(res)
//                     })
//                 } else {
//                     this.loginPage.once("load", loggedInCheckHandler)
//                 }
//             }
//             this.loginPage = (await this.noHeadlessBrowser.pages())[0]
//             this.loginPage.once("load", loggedInCheckHandler)
//             this.loginPage.goto(this.dashBoardURL)
//         })
//     }
//     async updateComment() {
//         this.newComments = await this.mainPage.evaluate(() => {
//             return YoutubeLiveComment.commentUpdate()
//         })
//         this.comments = await this.mainPage.evaluate(() => {
//             return YoutubeLiveComment.getComments()
//         })
//         return this.comments
//     }
// }
// export default YoutubeLiveComment
// export {
//     YoutubeLiveCommentOnPage,
// } 
"use strict";