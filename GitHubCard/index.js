/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

/************** S T A R T **************/
/***************************************/

/* Error 403/404 Handler */
axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response.status === 403) {
      console.log('Loaded the page too many times, chill out ...');
      auth.logout();
      router.replace('/TooManyCalls');
  }
  if (error.response.status === 404) {
    console.log('Not Found, Does not Exist ...');
    auth.logout();
    router.replace('/DoesNotExist');
}
  return Promise.reject(error.response);
});
const [cards] = document.getElementsByClassName('cards');

/* This or That

axios.get('https://api.github.com/users/cloudgang')
  .then(response => {
    console.log('Card Data: ', response);
    const uI = response.data;
    console.log('User Info: ', uI);
    return axios.get('https://api.github.com/users/cloudgang/followers');
})

*/ 
function addGitHubUser(...users) {
  const url = 'https://api.github.com/users';
  const promises = users.map(user => axios.get(`${url}/${user}`));

  Promise.all(promises).then(values => {
          values.forEach(value => {
            const card = createCard(value.data);
            cards.append(card);
          });
  });
}

addGitHubUser('cloudgang');

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

/* This or That 

followersArray.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)
  .then(response => {
    console.log(response.data);
    cards.appendChild(createCard(response));
  })
})

*/

addGitHubUser(...followersArray);

function createCard(data) {

  const card = document.createElement('div');
  const img = document.createElement('img');
  const userInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const profileLink = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  
  card.append(img, userInfo);
  userInfo.append(name, userName, location, profile, followers, following, bio);
  profile.append(profileLink);

  card.classList.add('card');
  img.src = data.avatar_url;
  userInfo.classList.add('card-info');
  name.classList.add('name');
  name.setAttribute('id', "name");
  name.textContent = data.name;
  userName.classList.add('username');
  userName.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  profile.prepend('Profile: ');
  profileLink.href = data.html_url;
  profileLink.textContent = data.html_url;
  followers.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  bio.textContent = `Bio: ${data.bio}`;
  
  var styleyStyles = `
  .name {
    color: red;
  }
  `
  var styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = styleyStyles

  name.append(styleSheet)

  /*
  var str = document.getElementById("name").innerHTML; 
  var res = str.replace("Supreme Ciento", "Erik Faison");
  document.getElementById("name").innerHTML = res;
 */
  return card;
}


