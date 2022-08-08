


function post() {
    let title = $("#input-name").val()
    let comment = $('#textarea-about').val()
    let file = $('#input-pic')[0].files[0]
    let today = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
    let form_data = new FormData()

    form_data.append("file_give", file)
    form_data.append("title_give", title)
    form_data.append("comment_give", comment)
    form_data.append("date_give", today)
    $.ajax({
        type: "POST",
        url: "/posting",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            $("#modal-edit").removeClass("is-active")
            window.location.reload()
        }
    })
}
function get_posts(username) {
    if (username == undefined) {
        username = ""
    }
    $.ajax({
        type: "GET",
        url: `/get_posts?username_give=${username}`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let posts = response["posts"]
                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    let time_post = post["date"]
                    let title = post['title']
                    let comment = post['comment']
                    let username2 = post['username']
                    let time_now = time_post.slice(0, 16)
                    let html_temp = ''

                    if (username == "") {
                        html_temp = `<div class="col">   
                     <div class="card h-100">
                    <img src="/static/${post['post_pic_real']}"
                     class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="mycomment">제목: ${title}</p>
                    <p class="mycomment" >설명: ${comment}</p>
                    <p class="mycomment">작성자: ${username2}</p>
                    <p class="mycomment">작성일: ${time_now}</p>
                     <nav id="btns-me" class="level is-mobile" style="margin-top:2rem">
                    <button style="width: 45%" class="button is-danger" onclick="post_delete('${post["date"]}')">삭제</button>
                    <button style="width: 45%" onclick='$("#post-edit").addClass("is-active")' class="button button is-info">수정</button>
                    </nav>
                    </div>
                     </div>
                        </div>`
                    }
                    else {
                        let give_id = post['_id']
                        html_temp = `<div class="col">   
                     <div class="card h-100">
                    <img src="/static/${post['post_pic_real']}"
                     class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="mycomment">제목: ${title}</p>
                    <p class="mycomment">설명: ${comment}</p>
                    <p class="mycomment">작성자: ${username2}</p>
                    <p class="mycomment">작성일: ${time_now}</p>
                     <nav id="btns-me" class="level is-mobile" style="margin-top:2rem">
                    <button style="width: 45%" class="button is-danger" onclick="post_delete('${post["date"]}')">삭제</button>
                    <button style="width: 45%" onclick='$("#post-edit").addClass("is-active")' class="button button is-info">수정</button>
                    </nav>
                     <div class="modal" id="post-edit">
                    <div class="modal-background" onclick='$("#modal-edit").removeClass("is-active")'></div>
                    <div class="modal-content">
                    <div class="box">
                        <article class="media">
                            <div class="media-content">
                            <div class="field">
                                <label class="label" for="input-name">사진 제목</label>
    
                                <p class="control">
    
                                    <input id="input-name2" class="input"
                                           placeholder="사진 제목">
                                </p>
                            </div>
                            <div class="field">
                                <label class="label" for="input-pic2">올릴 사진</label>
                                <div class="control is-expanded">
                                    <div class="file has-name">
                                        <label class="file-label" style="width:100%">
                                        <input id="input-pic2" class="file-input" type="file" name="resume">
                                                <span class="file-cta"><span class="file-icon"><i class="fa fa-upload"></i></span>
                                                <span class="file-label">파일 선택</span>
                                                </span>
                                           
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="textarea-about">사진을 묘사해주세요~😀</label>
   
                                <p class="control">
   
                                                <textarea id="textarea-about2" style="overflow: scroll" class="textarea"
                                                          placeholder="사진 소개하기"></textarea>
                                </p>
                            </div>
                            <nav class="level is-mobile">
                                <div class="level-left">
    
                                </div>
                                <div class="level-right">
                                    <div class="level-item">
                                        <a class="button is-sparta" onclick="post_modify('${post["date"]}')">업데이트</a>
                                    </div>
                                    <div class="level-item">
                                        <a class="button is-sparta is-outlined"
                                           onclick='$("#post-edit").removeClass("is-active")'>취소</a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
            </div>
         <button class="modal-close is-large" aria-label="close"
                onclick='$("#post-edit").removeClass("is-active")'></button>
            </div>
                    </nav>    
                    </div>
                     </div>
                        </div>`
                    }
                    $("#cards-box").append(html_temp)
                }
            }
        }
    })
}

function post_delete(id){
    let give_id = id

     $.ajax({
        type: "POST",
        url: `/delete_posts`,
        data: {id_give :give_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}

function post_modify(id){
    let id2 = id
    let title = $("#input-name2").val()
    let comment = $('#textarea-about2').val()
    let file = $('#input-pic2')[0].files[0]
    let form_data = new FormData()
    alert(id2)
    alert(title)
    alert(comment)
    form_data.append("file_give", file)
    form_data.append("title_give", title)
    form_data.append("comment_give", comment)
    form_data.append("id_give", id2)
    $.ajax({
        type: "POST",
        url: "/modifying",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            $("#modal-edit").removeClass("is-active")
            window.location.reload()
        }
    })
}

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}

