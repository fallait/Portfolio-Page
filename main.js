fetch('data.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        //console.log(data);
        function renderNavbar(page, navs) {
            if (page == 'main') {
                return `<nav><li>
                <a href="#About" id = "navbar">About</a>
            </li>
            <li>
                <a href="#Projects" id = "navbar">Projects</a>
            </li>
            <li>
                <a href="#News" id = "navbar">News</a>
            </li></nav>`;
            }
            else {
                return `<nav><li>
                <a href="index.html" id = "navbar">Back</a>
            </li></nav>`
            }
        }

        function renderAbout(about) {
            return `<section id="About"></section>
            <div class="row" id="top">
                <div class="col-6">
                    <img src="${about.photo}" class="propic"></img>
                </div>
                <div class="col-6">
                    <h2>${about.name}</h2>
                    <p>
                        <b>${about.title}</b>
                    </p>
                    <p>${about.email}</p>
                    <p id="socials">
                    <a href="${about.socials[0].source}" id="socials"><i class="${about.socials[0].icon}"></i> ${about.socials[0].id}</a> |
                    <a href="${about.socials[1].source}" id="socials"><i
                            class="${about.socials[1].icon}"></i></a> |
                    <a href="${about.socials[2].source}" id="socials"><i class="${about.socials[2].icon}"></i></a>
                </p>
                <p> ${about.description}  
                </div>
                </div> `
        }

        function renderProjectItems(projects) {
            return projects.map(d => `
                  <div class="row">
                  <div class="col-6">
                    <h3>
                      <a href="?project=${d.id}" id = "links">${d.title}</a>
                    </h3>
                    <p>
                      ${d.authors}<br>
                    </p>
                    <ul class="tags">
                    <li id="${d.tags[0]}">${d.tags[0]}</li>
                    <li id="${d.tags[1]}">${d.tags[1]}</li>
                    <li id="${d.tags[2]}">${d.tags[2]}</li>
                    </div>
                    <div class="col-6">
                    <img src="${d.photo}" width="50%">
                    </div>
                `).join('');
        }

        function renderProjects(projects) {
            return `
            <section id="Projects">
            ${renderProjectItems(projects)}
            </section>
            `
        }

        function renderNews(news) {
            return `
                <section id="News"></section>
        <div class="row">
        <div class="col-12">
        <h2 class="animate__animated animate__infinite animate__bounce animate__delay-2s">News</h2>
        <div class ="row">
            
                <div class ="row">
<div class="col-6"><p>
                ${news.title}</p>
            </div>
            <div class="col-6"><p>
            ${news.date}</p>
            </div>
        </div>
            `
        }

        function renderMainPage(data) {
            renderNavbar('main', Object.keys(data));
            document.querySelector('.container').innerHTML = `
        ${renderNavbar('main', Object.keys(data))}
        ${renderAbout(data.About)}
        ${renderProjects(data.Projects)}
        ${renderNews(data.News)}
        `
        }


        function renderProjectMaterials(d) {
            console.log(d)
                if (d.label == "video") {
                    return `<div class="col-6">
                    <iframe width="75%" height="75%" src="${d.path}" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe></div>`
                }
                if (d.label == "photo") {
                    return `<div class="col-6">
                    <img src = "${d.path}" width = "75%"></div>`
                }
                if (d.label == "slides") {
                    return `<div class="col-6">
                    <a href="${d.path}" id = "links">Slide Deck</a>`
                }
                
            }

        function renderProjectPage(project) {
            project = project[0];
            document.querySelector('.container').innerHTML = `
            ${renderNavbar('project', ["Back"])}
            <div class="row">
            <div class="col-12">
            <h2> ${project.title} </h2>
            </div>
            </div>
            <div class="row">
            <div class="col-6">
            <h3><b>${project.authors}</b>
            </h3>
            </div>
            <div class ="col-6">
            <h3>${project.description}</h3>
            </div>
            </div>
            <div class="row">
            ${project.materials.map(d=>renderProjectMaterials(d)).join('')}
            </div>
            `
        }

        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const project = urlParams.get('project')
        console.log(project)
        if (!project) {
            renderMainPage(data);
        }
        else {
            renderProjectPage(data.Projects.filter(d => d.id == project));
        }
    }
    )

