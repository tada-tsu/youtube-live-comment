class YoutubeLiveComment {
    /**
     *Creates an instance of YoutubeLiveComment.
     * @memberof YoutubeLiveComment
     * 
     */
    constructor() {

        this._newComments = {
            comments: [],
        }

    }


    /**
     *
     * @typedef {Object} Comments
     * @property {boolean} paid Paid comment (Super Chat)
     * @property {string} id Comment ID
     * @property {string} image Comment author image
     * @property {string} timestamp Comment timestamp
     * @property {string} author_name Comment author name
     * @property {string} message Comment body html tag
     * @property {string} price Paid price with currency (Super Chat)
     * 
     */

    /**
     *
     * @typedef {Object} CommentsObj
     * @property {Comments[]} comments
     * 
     */



    /**
     * get comment by DOM
     *
     * @param {boolean} [returnJson=false]
     * @returns {CommentsObj|string}
     * @memberof YoutubeLiveComment
     */
    commentUpdate(returnJson = false) {
        this._newComments = {
            comments: [],
        }

        const commentSelectors = {
            normal: "yt-live-chat-text-message-renderer",
            paid: "yt-live-chat-paid-message-renderer",
        }

        const frame = document.querySelector("#live-chat-iframe") || document.querySelector("#chatframe")
        const frameDocument = frame.contentDocument

        const newComments = frameDocument.querySelectorAll(`${commentSelectors.normal}:not([data-catched]), ${commentSelectors.paid}:not([data-catched])`)

        for (let i = 0; i < newComments.length; i++) {
            const comment = newComments[i];

            const isPaid = comment.tagName == commentSelectors.paid.toUpperCase()

            if (
                typeof comment.querySelector("#author-photo img").src === "undefined" &&
                comment.querySelector("#author-photo img").src === ""
            ) {
                break
            }
            
            this._newComments.comments.push({
                paid: isPaid,
                id: comment.id,
                image: comment.querySelector("#author-photo img").src,
                timestamp: comment.querySelector("#timestamp").textContent,
                author_name: comment.querySelector("#author-name").textContent,
                message: comment.querySelector("#message").innerHTML,
                price: isPaid ? comment.querySelector("#purchase-amount").textContent : null,
            })

            comment.dataset.catched = true
        }

        return this.getNewComments(returnJson)
    }



    /**
     * get new comments
     *
     * @param {boolean} [json=false] change return data type
     * @returns {CommentsObj|string}
     * @memberof YoutubeLiveComment
     */
    getNewComments(json = false) {
        return this._getData(this._newComments, json)
    }

    /**
     * get json stringifiable data
     *
     * @param {any} data
     * @param {boolean} [json=false]
     * @returns {(any|string)}
     * @memberof YoutubeLiveComment
     */
    _getData(data, json = false) {
        if (json) {
            return JSON.stringify(data)
        } else {
            return data
        }
    }
}
