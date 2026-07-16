async function loadPosts(){
    const res = await fetch("/posts");
    const posts = await res.json();

    const container = document.getElementById("posts");
    container.innerHTML="";

    posts.reverse().forEach(text=>{
        const div=document.createElement("div");
        div.className="post";
        div.textContent=text;
        container.appendChild(div);
    });
}

document.getElementById("post").onclick=async()=>{

    const text=document.getElementById("message").value.trim();

    if(!text) return;

    await fetch("/post",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({text})
    });

    document.getElementById("message").value="";

    loadPosts();
};

loadPosts();

setInterval(loadPosts,5000);
