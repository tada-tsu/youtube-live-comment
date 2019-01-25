"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YoutubeLiveCommentOnPage = exports.default = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _libxmljs = _interopRequireDefault(require("libxmljs"));

var _onPage = _interopRequireDefault(require("./onPage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class YoutubeLiveComment {
  /**
   *Creates an instance of YoutubeLiveComment.
   * @param {array} [cookie=[]]
   * @memberof YoutubeLiveComment
   */
  constructor(cookie = []) {
    this.dashBoardURL = "https://www.youtube.com/live_dashboard";

    if (cookie.length > 0) {
      this.cookie = cookie;
    }

    this.comments = [];
    this.newComments = [];
  }

  initDashBoard() {
    return new Promise(async resolve => {
      this.mainBrowser = await _puppeteer.default.launch();
      this.mainPage = (await this.mainBrowser.pages())[0];

      if (typeof this.cookie != "undefined") {
        await this.mainPage.setCookie(...this.cookie);
      }

      this.mainPage.once("load", async () => {
        if (this.isLoginPage(this.mainPage.url())) {
          this.cookie = await this.login();
        }

        if (typeof this.cookie != "undefined") {
          await this.mainPage.setCookie(...this.cookie);
          await this.mainPage.goto(this.dashBoardURL);
        }

        await this.mainPage.evaluate(YoutubeLiveCommentOnPageString => {
          return eval(`
                        ${YoutubeLiveCommentOnPageString}
                        window.YoutubeLiveComment = new YoutubeLiveComment() 
                        `);
        }, _onPage.default.toString());
        resolve();
      });
      await this.mainPage.goto(this.dashBoardURL);
    });
  }

  async goDashBoard() {
    return await this.mainPage.goto(this.dashBoardURL);
  }

  isLoginPage(url) {
    return /^https:\/\/accounts\.google\.com\/ServiceLogin/.test(url) || /^https:\/\/accounts\.google\.com\/signin\//.test(url);
  }

  login() {
    return new Promise(async resolve => {
      this.noHeadlessBrowser = await _puppeteer.default.launch({
        headless: false
      });

      const loggedInCheckHandler = () => {
        if (this.loginPage.url() == this.dashBoardURL) {
          this.loginPage.cookies().then(async res => {
            await this.noHeadlessBrowser.close();
            resolve(res);
          });
        } else {
          this.loginPage.once("load", loggedInCheckHandler);
        }
      };

      this.loginPage = (await this.noHeadlessBrowser.pages())[0];
      this.loginPage.once("load", loggedInCheckHandler);
      this.loginPage.goto(this.dashBoardURL);
    });
  }

  async updateComment() {
    this.newComments = await this.mainPage.evaluate(() => {
      return YoutubeLiveComment.commentUpdate();
    });
    this.comments = await this.mainPage.evaluate(() => {
      return YoutubeLiveComment.getComments();
    });
    return this.comments;
  }

}

exports.YoutubeLiveCommentOnPage = YoutubeLiveComment;
const cookie = [{
  name: '_gat',
  value: '1',
  domain: '.youtube.com',
  path: '/',
  expires: 1548234153,
  size: 5,
  httpOnly: false,
  secure: false,
  session: false
}, {
  name: 'APISID',
  value: 'mFcEjRIq741gQZKd/A0o0_yKYpdlNpcjU9',
  domain: '.youtube.com',
  path: '/',
  expires: 1611306085.829506,
  size: 40,
  httpOnly: false,
  secure: false,
  session: false
}, {
  name: 'VISITOR_INFO1_LIVE',
  value: 'F1eEBKzg65o',
  domain: '.youtube.com',
  path: '/',
  expires: 1563786076.772989,
  size: 29,
  httpOnly: true,
  secure: false,
  session: false
}, {
  name: 'LOGIN_INFO',
  value: 'AFmmF2swRQIhAIwl3zh86UgdV8a5o9c4mbAmU6Mv5ThaP4aJuf0P9CdwAiAxwZNCUh2YTLtZo5m-S1ZLevm3eyAHGswZtCRNEuwqcQ:QUQ3MjNmd3dqR3E0QUU3Y2xMbFlGeU9ZUi0zNml0Q2lhU1F0aVY3Zk15S2J1TGFxbHVZdl8xZmZmckhtcjJaTGNkN2pVM0VBQk5UT1M4TTNZMTVyT2dIMUdFY2NKUjZqc1VXcmN2YnBUVk9iRHRBeGR5cUs0a0VRV25tLVVvYU90eE55OFRkaExNY01ELV8tVlVCVGpVSmcwUk5aZUJsMFNzQ041dTVQWHY0Wldsd2RMak1KN19sQ0YybjJwUTVwWWY4SjNuYkdvS2dlOVhjSUlqLTZ5OGZJVU8zZTJmZTVJMWNhMC1ENmFKdVdPVW9US1NDVjhxTQ==',
  domain: '.youtube.com',
  path: '/',
  expires: 1611306090.141811,
  size: 445,
  httpOnly: true,
  secure: false,
  session: false
}, {
  name: 'PREF',
  value: 'f1=50000000',
  domain: '.youtube.com',
  path: '/',
  expires: 1569272056.773023,
  size: 15,
  httpOnly: false,
  secure: false,
  session: false
}, {
  name: 'HSID',
  value: 'AxEHiN-zqr_p29Ndv',
  domain: '.youtube.com',
  path: '/',
  expires: 1611306085.829309,
  size: 21,
  httpOnly: true,
  secure: false,
  session: false
}, {
  name: '_ga',
  value: 'GA1.2.1122365059.1548234093',
  domain: '.youtube.com',
  path: '/',
  expires: 1611306093,
  size: 30,
  httpOnly: false,
  secure: false,
  session: false
}, {
  name: '_gid',
  value: 'GA1.2.1447945143.1548234093',
  domain: '.youtube.com',
  path: '/',
  expires: 1548320493,
  size: 31,
  httpOnly: false,
  secure: false,
  session: false
}, {
  name: 'SSID',
  value: 'AX2TqCTQY86ZaZ9dq',
  domain: '.youtube.com',
  path: '/',
  expires: 1611306085.829429,
  size: 21,
  httpOnly: true,
  secure: true,
  session: false
}, {
  name: 'SAPISID',
  value: 'Wr-5UhiclxbkLPWN/AsWYB-F7Q_Az2ajZx',
  domain: '.youtube.com',
  path: '/',
  expires: 1611306085.82955,
  size: 41,
  httpOnly: false,
  secure: true,
  session: false
}, {
  name: 'GPS',
  value: '1',
  domain: '.youtube.com',
  path: '/',
  expires: 1548235876.772928,
  size: 4,
  httpOnly: false,
  secure: false,
  session: false
}, {
  name: 'SID',
  value: '_Abk5nGHHG7zeakhirc535ulyKsuIgMWlzvNCubCv9gxJd5gZELUI_mWDgxIMHf_0jzwGg.',
  domain: '.youtube.com',
  path: '/',
  expires: 1611306085.829252,
  size: 74,
  httpOnly: false,
  secure: false,
  session: false
}, {
  name: 'YSC',
  value: '3PKUmG65bYM',
  domain: '.youtube.com',
  path: '/',
  expires: -1,
  size: 14,
  httpOnly: true,
  secure: false,
  session: true
}];
const youtubeLiveComment = new YoutubeLiveComment(cookie);
youtubeLiveComment.initDashBoard().then(res => {
  setInterval(() => {
    youtubeLiveComment.updateComment().then(res => {
      console.log(youtubeLiveComment.comments);
    });
  }, 1000);
});
var _default = YoutubeLiveComment;
exports.default = _default;