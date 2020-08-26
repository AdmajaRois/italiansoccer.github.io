const base_url = "https://api.football-data.org/v2/";
const auth_api = "9f1962a5c1204b1e93c7bd793146ea21"

const status = (response) =>{
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);
        
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

const json = response =>{
    return response.json();
}

const error = error =>{
    console.log(`Error : ${error}`)
}

const requestData =(url, onComplete)=>{
    fetch(url, {
        method:"GET",
            headers: {
                "X-Auth-Token": `${auth_api}`
            }
    })
    .then(status)
    .then(json)
    .then(onComplete)
    .catch(error)
}

const generateUrl = (path) =>{
    const url = `${base_url}${path}`;
    return url
}

const getStandings = () =>{
    const url = generateUrl(`competitions/2019/standings`);
    requestData(url, renderStandings);
}

const getMatch = () =>{
    const url = generateUrl(`competitions/2019/matches`);
    requestData(url, renderMatches);
}

const getClubById = () =>{
    return new Promise((resolve, reject)=>{
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
                   
        fetch(`${base_url}teams/${idParam}`,{
                        method:"GET",
                        headers: {
                            "X-Auth-Token":"9f1962a5c1204b1e93c7bd793146ea21"
                        }
                    })
                    .then(status)
                    .then(json)
                    .then(data=>{
            
                        let clubHTML = `
                        <style>
                            .card-image {
                                 padding: 10px;
                            }
                        </style>
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                            </div>
                            <div class="card-content">
                                <span class="card-title center">${data.name}</span>
                                <p>Address  : ${data.address}</P>
                                <p>Phone    : ${data.phone}</p>
                                <p>Website  : ${data.website}</p>
                                <p>Email    : ${data.email}</p>
                                <p>Vanue    : ${data.venue}</p>
                            </div>
                        </div>
                        `;
                        let squadHTML = "";
                        data.squad.forEach(squad=>{
                            squadHTML += `
                            <div class="col s12 m4" id="squad">
                                <div class="card">
                                    <div class="card-content">
                                        <span class="card-title center">${squad.name}</span>
                                        <p>Position     : ${(squad.position === null) ? squad.role : squad.position}</p>
                                        <p>Nationality  : ${squad.nationality}</p>
                                    </div>
                                </div>
                            </div>`;
                        });
                        document.getElementById("club-info").innerHTML = clubHTML;
                        document.getElementById("squad").innerHTML = squadHTML;
            
                        resolve(data);
                    }).catch(error=>{
                        reject(error)
            })
        
    });
}


const getFavoriteClub=()=>{
    getAll().then(club=>{
        console.log(club);
       let teamHTML = "";
            if (club === undefined || club.length == 0) {
                teamHTML = `<h2 class="center">tidak ada club tersimpan</h2> `;
            } else {
                club.forEach(club=>{
                    teamHTML += `
                        <style>
                            .card-image {
                                padding: 10px;
                            }
                        </style>
                        <div class="col s12 m6">
                            <div class="card">
                                <a href="./club.html?id=${club.id}&saved=true">
                                <div class="card-image">
                                    <img src="${club.crestUrl}" height="128px" width="128px" alt="logo club">
                                </div>
                                </a>
                                <div class="card-content">
                                    <span class="card-title center">${club.name}</span>
                                </div>
                            </div>
                        </div>`;
                });
            }
            document.getElementById("saved-clubs").innerHTML = teamHTML;
    })
}

const getSavedClubById = ()=>{
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getClubById(idParam).then(club=>{
        let clubHTML = `
        <style>
            .card-image {
                padding: 10px;
            }
        </style>
        <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img src="${club.crestUrl}" />
            </div>
            <div class="card-content">
                <span class="card-title center">${club.name}</span>
                <p>Address  : ${club.address}</P>
                <p>Phone    : ${club.phone}</p>
                <p>Website  : ${club.website}</p>
                <p>Email    : ${club.email}</p>
                <p>Vanue    : ${club.venue}</p>
            </div>
        </div>
        `;
        let squadHTML = "";
        club.squad.forEach(squad=>{
            squadHTML += `
                            
            <div class="card">
                <div class="card-content">
                    <span class="card-title center">${squad.name}</span>
                    <p>Position     : ${(squad.position === null) ? squad.role : squad.position}</p>
                    <p>Nationality  : ${squad.nationality}</p>
                </div>
            </div>`;
        });
        document.getElementById("club-info").innerHTML = clubHTML;
        document.getElementById("squad").innerHTML = squadHTML;
    })
}