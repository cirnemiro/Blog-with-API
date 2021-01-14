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
            $('.modalPost__mail').html(dataFromPetition.email)
            
            // // print data from petition

        }
        // peticion al servidor por ID
        var settings = {
            "url": `https://jsonplaceholder.typicode.com/users/${data.id}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
              "tile": "holatio",
              "Cookie": "__cfduid=de908844017500a5fe40f0af2536d49721610547910"
            },
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
});
