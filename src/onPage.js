class YoutubeLiveComment {
    /**
     *Creates an instance of YoutubeLiveComment.
     * @memberof YoutubeLiveComment
     * 
     */
    constructor() {

        this._comments = []
        this._newComments = []

    }

    
    /**
     *
     * @typedef {Object} Comments
     * @property {string} id Comment ID
     * @property {string} image Comment author image
     * @property {string} timestamp Comment timestamp
     * @property {string} author_name Comment author name
     * @property {string} message Comment body html tag
     * 
    */
    
    /**
     * get comment by DOM
     *
     * @param {boolean} [returnJson=false]
     * @returns {(Comments|string)}
     * @memberof YoutubeLiveComment
     */
    commentUpdate(returnJson = false) {
        this._newComments = []
        const newComments = document.querySelector("#live-chat-iframe").contentDocument.querySelectorAll("yt-live-chat-text-message-renderer:not([data-catched])")

        for (let i = 0; i < newComments.length; i++) {
            const comment = newComments[i];

            this._newComments.push({
                id: comment.id,
                image: comment.querySelector("#author-photo img").src,
                timestamp: comment.querySelector("#timestamp").textContent,
                author_name: comment.querySelector("#author-name").textContent,
                message: comment.querySelector("#message").innerHTML,
            })

            comment.dataset.catched = true
        }

        this._comments.push(...this._newComments)

        return this.getNewComments(returnJson)
    }


    /**
     * get all comments
     *
     * @param {boolean} [json=false] change return data type
     * @returns {(Comments|string)}
     * @memberof YoutubeLiveComment
     */
    getComments(json = false) {
        return this._getData(this._comments, json)
    }

    /**
     * get new comments
     *
     * @param {boolean} [json=false] change return data type
     * @returns {(Comments|string)}
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
