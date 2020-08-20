const renderStandings=(data)=>{
    let klasemenHTML = "";
    data.standings[0].table.forEach(club => {
        klasemenHTML += `
        <tr>
            <td>${club.position}</td>
            <td><a href="club.html?id=${club.team.id}"><img src="${club.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="50px" height="50px alt="club logo"></a></td>
            <td>${club.team.name}</td>
            <td>${club.playedGames}</td>
            <td>${club.won}</td>
            <td>${club.draw}</td>
            <td>${club.lost}</td>
            <td>${club.goalsFor}</td>
            <td>${club.goalsAgainst}</td>
            <td>${club.goalDifference}</td>
            <td>${club.points}</td>
        </tr>`
    });
    document.getElementById("teams").innerHTML = klasemenHTML;
}

const renderMatches=(data)=>{
    let scheduleHTML = "";
        data.matches.forEach(match => {
          scheduleHTML += `
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <div class="row">
                      <div class="col s8 m8">
                        <p>${match.homeTeam.name}</p>
                        <p>${match.awayTeam.name}</p>
                      </div>
                      <div class="col s2 m2">
                        <p>${(match.score.fullTime.homeTeam===null) ? "coming" : match.score.fullTime.homeTeam}</p>
                        <p>${(match.score.fullTime.awayTeam===null) ? "soon!" : match.score.fullTime.awayTeam}</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-content grey lighten-4">
                    <p>${match.utcDate.slice(0, 10)}</P>
                  </div>
                </div>
              </div>
          `;
        });
        document.getElementById("matches").innerHTML = scheduleHTML;
}