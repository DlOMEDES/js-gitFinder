$(document).ready(function() {
  $('#user').on('keyup', function(e) {
    let username = e.target.value;

    // ajax request to github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data: {
        client_id:'5c69d34d9cb526967c0a',
        client_secret:'eff643d0739e633b85f67a715129604313241557'
      }
    }).done(function(user) {
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data: {
          client_id:'5c69d34d9cb526967c0a',
          client_secret:'eff643d0739e633b85f67a715129604313241557'
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>
                </div>
                <div class="col-md-3">
                  <strong>${repo.description}</strong>
                </div>
                <div class="col-md-2">
                  
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
      <div class="card bg-dark">
      <div class="card-header">
        ${user.name}
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <img src="${user.avatar_url}" class="thumbnail avatar">
            <a href="${user.html_url}" target="_blank" class="btn btn-info btn-block">View Profile</a>
          </div>
          <div class="col-md-9">
          <span class="badge badge-default">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Websites/Blod: ${user.blog}</li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member since: ${user.created_at}</li>
          </ul>
          </div>
        </div>
      </div>
    </div>
    <h3 class="page-header">Latests Repos</h3>
    <div id="repos"></div>
      `)
    });
  });
});