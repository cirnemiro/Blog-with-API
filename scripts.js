// scripts
$(document).ready(function () {
    let currentId = 0
    let posts = [];




    var settings = {
        "url": "https://jsonplaceholder.typicode.com/posts?",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        posts=response;
        init()
    });
    const init = ()=>{
        console.log(posts);
        printPosts();
    }

    const printPosts = ()=>{
        // imprimirremos los posts
        posts.forEach((e,i)=>{
            if (i<=10) {
                // variables DOM
                const $posts = $('.posts');
                // crear elemento html
                const divElement = $('<div></div>');
                const divElementData = $('<div></div>');
                const divElementicons = $('<div></div>');
                // ponerle el contenido al elemento HTML
                divElementData.html(`
                    <h3 class="post_element_data__title">${e.title}</h3>
                    <p class="post_element_data__body">${e.body}</p>
                `);
                divElementicons.html(`
                    <!-- svg edit -->
                    <i class="fa fa-pencil-square-o editIcon" aria-hidden="true"></i>
                    <!-- svg delete -->
                    <i class="fa fa-times-circle-o editIcon" aria-hidden="true"></i>
                `)
                // ponerle clases al elemento
                divElement.addClass('post__element');
                divElementData.addClass('post_element__data');
                divElementicons.addClass('post_element__icons');
                // añadir dataset
                divElementData.attr('data-id', e.id);
                currentId = e.id
                divElementData.attr('data-title', e.title);
                divElementData.attr('data-body', e.body);
                // append del elemento
                divElement.append(divElementData);
                divElement.append(divElementicons);
                $posts.append(divElement);
                // add event listener
                divElementData.click(onClickData);

            }

        })
    }
    const printModalPost = (data)=>{
        const $close = $('.modalClose')
        $close.click(()=>{
            $('.modalPost').addClass('hidden')
        })


        const printData = (dataFromPetition)=>{

            console.log(dataFromPetition);
            console.log(data);
            // //DOM selector
            $('.modalPost__title').html(data.title)
            $('.modalPost__body').html(data.body)
            $('.modalPost__name').html(dataFromPetition.name)
            $('.modalPost__email').html(dataFromPetition.email)
            $('.modalPost_comments_element__btn').click(showComments)

            // // print data from petition

        }

        // peticion al servidor por ID
        var settings = {
            "url": `https://jsonplaceholder.typicode.com/users/${data.id}`,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            printData(response)
        });



    }
    const onClickData = (e)=>{
        const $modal = $('.modalPost');
        $modal.removeClass('hidden');
        printModalPost({
            id: e.target.parentNode.dataset.id,
            title: e.target.parentNode.dataset.title,
            body: e.target.parentNode.dataset.body
        })
    }

    const showComments = ()=>{
        // Variables
        const $commentsElement = $('.modalPost__comments');
        var settings = {
            "url": "https://jsonplaceholder.typicode.com/comments",
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            printComents(response);
        });

        const printComents = (data)=>{
            data.forEach(e => {
                if (e.postId == currentId) {
                    const commentElement = $('<div></div>')
                    commentElement.html(`
                        <h3 class="modalPost_comments_element__title">${e.name}</h3>
                        <p class="modalPost_comments_element__body">${e.body}</p>
                        <p class="modalPost_comments_element__email">${e.email}</p>
                    `)
                    $commentsElement.append(commentElement)
                }
            });
        }
        // Put the information
        // $commentsTitle.html(dataComment.title);
        // $commentsBody.html(dataComment.body);
        // $commentsEmail.html(dataComment.email);
    }

    


});

