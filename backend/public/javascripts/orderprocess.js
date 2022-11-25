let qtyavailable = 0;
let producttoorder = undefined;

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const createOrder = (productid, productqty) => {

    qtyavailable = parseInt(productqty);
    producttoorder = productid;

    document.body.scrollIntoView({behavior: "smooth"});
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closemodal= () =>{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    qtyavailabel = 0;
    producttoorder = undefined;
};

const finalorder = () => { 
    const qtyentered = document.getElementById('prodqty').value;
    if(!qtyentered){
        alert('Please enter a quantity');
        return;
    }
    if(qtyentered > qtyavailable){
        alert('Quantity entered is more than available');
        return;
    }
    const orderstring = `./createorder?prodid=${producttoorder}&qty=${qtyentered}`;
    document.location.href = orderstring;
    return; 
};