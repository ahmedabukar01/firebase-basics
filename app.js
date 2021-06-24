const ul = document.querySelector('ul');
const form = document.querySelector('form');

const htmlTemplete = (data,id)=>{
    const time = data.created_at.toDate();
    const html = `
        <li data-id="${id}">
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
        const id = doc.id;
        htmlTemplete(doc.data(),id);
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
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('practicing').doc(id).delete().then(()=>{
            console.log('deleted')
        })
    }
})