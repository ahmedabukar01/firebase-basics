const ul = document.querySelector('ul');
const form = document.querySelector('form');

const htmlTemplete = (data)=>{
    const time = data.created_at.toDate();
    const html = `
        <li>
            <div class="box">
                <div>${data.title}</div>
                <small>${time}</small>
            </div>
            <button>Delete</button>
        </li>
    `
    ul.innerHTML += html;
}
db.collection('practicing').get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
        htmlTemplete(doc.data());
    })

}).catch(err=>console.log(err));

form.addEventListener('submit',e=>{
    e.preventDefault();
    const now = new Date();
    const fruit = {
        title: form.fruit.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }

    db.collection('practicing').add(fruit).then(()=>{
        console.log('fruit added')
    }).catch(err=>console.log(err));
})

ul.addEventListener('click',e=>{
    if(e.target.tagName === 'BUTTON'){
        console.log(e.target.parentElement)
    }
})