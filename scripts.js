// scripts
$(document).ready(function () {
    let posts = [];




    var settings = {
        "url": "https://jsonplaceholder.typicode.com/posts?",
        "method": "GET",
        "timeout": 0,
        "headers": {
        "tile": "holatio",
        "Cookie": "__cfduid=de908844017500a5fe40f0af2536d49721610547910"
        },
    };

    $.ajax(settings).done(function (response) {
        posts=response;
    });
    function initialize(){
        if (posts.length>0) {
            console.log('full');
            clearInterval(interval)
            init()

        }else{
            console.log('empty');
        }
    }
    let interval = setInterval(initialize, 100);

    const init = ()=>{
        console.log(posts);
        printPosts();
    }
    const printPosts = ()=>{
        // imprimirremos los posts
        posts.forEach(e=>{
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
            // append del elemento
            divElement.append(divElementData);
            divElement.append(divElementicons);
            $posts.append(divElement);

        })
        const printModalPost = ()=>{
            
        }
    }
});
