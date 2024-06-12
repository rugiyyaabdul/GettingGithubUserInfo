const photo = document.getElementById("photo");
const username = document.getElementById("username");
const name = document.getElementById("name");
const company = document.getElementById("company");
onload = () =>{
    getData();
};


const getData = async () =>{

    swal("Github username:", {
        content: "input",
    }).then(async (value) => {
            const url = `https://api.github.com/users/${value}`;
            let response = await fetch(url);
            loadingView();
            if (response.status === 200) {
                const user = await response.json();
                viewUserData(user);
            }
            else {
                swal({
                    title: "Not found",
                    icon: "warning",
                    dangerMode: true,
                }).then((refresh) => {
                        if (refresh) {
                            location.reload();
                        }
                    });
            }
        });
};

const loadingView = ()=>{
    photo.innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
    username.innerHTML = '...';
    name.innerHTML = '...';
    company.innerHTML = '...';
}

const viewUserData = (user)=>{
    photo.innerHTML = user.avatar_url ? `<img style="height: 64px;" src="${user.avatar_url}" class="img-thumbnail" />` : 'No Photo';
    username.innerHTML = user.login ?? "No User Name";
    name.innerHTML = user.name ?? "No Name";
    company.innerHTML = user.company ?? "No Company Name";
}
