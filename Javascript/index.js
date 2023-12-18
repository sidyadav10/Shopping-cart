let cart = document.querySelector(".cart");
let final_price = document.querySelector(".total_price h4");
let xamrk = document.querySelector(".xmark");
let btn_add = document.getElementsByClassName("add");
let added_item = document.querySelector(".added_item");
let cart_item = document.querySelector("#cart_added_item");
let empty_cart = document.createElement("div");
        empty_cart.setAttribute("class","empty_cart");
        empty_cart.innerHTML = `your cart is empty..`
                      
 
            added_item.append(empty_cart)
let thank_you = document.createElement("div");
    thank_you.setAttribute("class","thank_you");
    thank_you.innerHTML = `Thank You Visit Again....`


cart.addEventListener("click",()=>{
    cart_item.classList.toggle("active")
})
close_cart_item();


for(let btn of btn_add){
        btn.addEventListener("click",add_to_cart)
    }



function add_to_cart(event){
    let button = event.target;
    let cart_item = button.parentElement.parentElement;
    let price = cart_item.getElementsByClassName("price")[0].innerHTML;
    let title = cart_item.getElementsByClassName("title")[0].innerHTML;
    let img = cart_item.getElementsByTagName("img")[0].src;
   add_item_to_cart(img,price,title)
}

function add_item_to_cart(img,price,title){
    
        
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class","item")
        let item_name = added_item.getElementsByClassName("title");
        for(item_title of item_name){
            if(item_title.innerHTML == title){
                alert("abe phehle se hai aur kitna add krega..")
                return
            }
            
        }
        newDiv.innerHTML = `<img src="${img}">
        <div class="des">
            <div class= "title">${title}</div>
            <div class = "price">${price}</div></div>
                        <input type="number"  class = "input_number" id="input_number" value = "1">
                        <div class="remover"></div>`;
     
        

                            added_item.append(newDiv)
                            empty_cart.remove()
                            thank_you.remove()
                            update_input()
        
                            
                            remove_cart_item()
                            check_out()
                            update_total()
                        
                    
}

function update_input(){
    const input = document.querySelectorAll("input");
    const added_item = document.querySelector(".added_item");
    const items = added_item.querySelectorAll(".items");
    for(let input_value of input){
        
        input_value.addEventListener("change",(e)=>{
            if(isNaN(e.target.value) || e.target.value <=0){
                input_value.value =1
                
            }
            total_input_price()
            
            
        })
    }
}

function check_out(){
    let check_out = cart_item.querySelector(".check_out");
    check_out.addEventListener("click",()=>{
        const added_item = document.querySelector(".added_item");
        const items = added_item.getElementsByClassName("item");
        let items_length = items.length;
        for(item of items){
            item.remove()
        }
        if(items_length >0){

            update_total()
            empty_cart.remove()
            added_item.append(thank_you)
        }
        
        
    })
}







function total_input_price(){
    
let  added_item = document.querySelector(".added_item");
let final_price = document.querySelector(".total_price h4");

let item = added_item.getElementsByClassName("item");
let total = 0;
for(let items of item){
    let price = items.getElementsByClassName("price");
    for(let item_price of price){
        let item = item_price.innerHTML.replace("$"," ");
        let it = item;
        let input_value = items.getElementsByClassName("input_number");
        for(let in_value of input_value){
           let i = in_value.value;
            total = total + (item * i)
        }

    }
}
final_price.innerHTML= "$" +total;
    
   
        

}

function remove_cart_item(){
    const remover_cart = document.getElementsByClassName("remover");
    for(remover of remover_cart){

        remover.addEventListener("click",(e)=>{
            e.target.parentElement.remove()
            update_total()
            total_input_price()
        })
    }
}
function close_cart_item(){
    xmark.addEventListener("click",()=>{
    cart_item.classList.remove("active")

    })
}


function update_total(){
    let total_price = [];
    let total_item = [];
    let count = 0;
  
    let price_parent = cart_item.getElementsByClassName("item");
    let cart_quantity = document.querySelector(".cart span"); 

   
    Number(cart_quantity.innerHTML);

  
    for(let prices of price_parent){
        let price = prices.getElementsByClassName("price")
        for(let prices of price){
            total_item.push(prices);
           total_price.push(prices.innerHTML.substring(1));
           
        }
    }
     
        total_price = total_price.reduce((acc,val)=>{
            return Number(acc) +Number(val);
         },[])
         if(total_price >0){
             final_price.innerHTML = `$${total_price}`;
             
            }else{
                final_price.innerHTML = " $ 0 ";
                
                
            }
            if(total_item.length >0){
                cart_quantity.innerHTML = `${total_item.length}`;
                
            }else{
                added_item.append(empty_cart)
                cart_quantity.innerHTML = `${total_item.length}`;
            }
            
           
            
            

    }
    update_total()