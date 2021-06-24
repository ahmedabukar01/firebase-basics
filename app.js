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
// retriving at one time 
/*
db.collection('practicing').get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
        const id = doc.id;
        htmlTemplete(doc.data(),id);
    })

}).catch(err=>console.log(err));
*/

// realtime listiners

db.collection('practicing').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
        const id = change.id;
        console.log(change.type)
        if(change.type === 'added'){
            htmlTemplete(change.doc.data());
        } else if(change.type == 'removed'){
            removeUi(id)
        }
    })
})
// adding data to firebase
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

// deleting data from firestore
ul.addEventListener('click',e=>{
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('practicing').doc(id).delete().then(()=>{
            console.log('deleted')
        })
    }
})

// deleting from UI
const removeUi = (id)=>{
    const li = document.querySelectorAll('li')
    console.log(li)
   li.forEach(i=>{
    if(i.getAttribute('data-id') === id){
        i.remove();
    }
   })
}
