const MovieReview = artifacts.require("MovieReview");
require('chai')
.use(require('chai-as-promised'))
.should();

contract(MovieReview,([deployer, user1, user2, user3, user4])=>{
    let movieReview;
    before(async () =>{
        movieReview = await MovieReview.deployed()
    })
    describe('Movie Review Deployment', async()=>{
        it('The deployment should be done successfully',async() =>{
            const address = await movieReview.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined) 
        })

        it('The deployed smart contract has the correct name', async()=>{
            const name = await movieReview.companyName();
            assert.equal(name, 'CinePlaza Movies')
        })
    })

    describe('Adding and deleting Location', async()=>{
        let result, locationNumber
        
        before(async ()=>{
            result = await movieReview.addLocation('Burnaby',{from: deployer})
            locationNumber = await movieReview.locationNumber()
        })
        it ('Adding location should be successful if all correct and done by owner', async ()=>{
            //SUCCESSFUL
            assert.equal(locationNumber,1);
            const event = result.logs[0].args;
                       
            assert.equal(event.id.toNumber(), locationNumber.toNumber(), 'Location id is correct');
            assert.equal(event.name, 'Burnaby','Location name is correct');
            assert.equal(event.active, true,'status is correct');
        })

        it ('Adding location should fail if done by user', async ()=>{
            //SUCCESSFUL
            await movieReview.addLocation('Burnaby',{from: user1}).should.be.rejected;
            
        })

        it ('Adding location should fail if name not given', async ()=>{
            //SUCCESSFUL
            await movieReview.addLocation('',{from: deployer}).should.be.rejected;
            
        })

        it ('Adding location should fail if same name location already exists', async ()=>{
            //SUCCESSFUL
            await movieReview.addLocation('Burnaby',{from: deployer}).should.be.rejected;
            
        })

        it ('Deleting location should fail if invalid location id passes', async ()=>{
            await movieReview.deleteLocation(2,{from: deployer}).should.be.rejected;
            
        })

        it ('Deleting location should fail if called by user', async ()=>{
            await movieReview.deleteLocation(1,{from: user1}).should.be.rejected;
            
        })

        it ('Deleting location should be successfull if done by owner', async ()=>{
            result =  await movieReview.deleteLocation(1,{from: deployer});
            
        })



        /*
        it ('Creating item should be failed if either no name or no price', async ()=>{
            //Product must have a name
            await movieReview.createItem('', web3.utils.toWei('1','Ether'), {from: seller}).should.be.rejected;
            //Price must be greater than 0
            await movieReview.createItem('T-Shirt', web3.utils.toWei('0','Ether'), {from: seller}).should.be.rejected;
        })

        it ('Check the item created', async ()=>{
            const item = await movieReview.items(totalNumber);
            assert.equal(item.itemId.toNumber(), totalNumber.toNumber(), 'Item id is correct');
            assert.equal(item.itemName, 'T-Shirt','Item name is correct');
            assert.equal(item.itemPrice, '1000000000000000000','Item price is correct');
            assert.equal(item.itemOwner, seller, 'Item owner is correct');
            assert.equal(item.isItemSold, false, 'item not sold is correct');
        })

        it('Sell the item', async () => {
            let sellerOldBalance;
            sellerOldBalance = await web3.eth.getBalance(seller);
            sellerOldBalance = new web3.utils.BN(sellerOldBalance);

            // SUCCESS: Buyer makes purchase
            result = await movieReview.buyItem(totalNumber, {from: buyer, value: web3.utils.toWei('1', 'Ether')});

            // Check Log
            const event = result.logs[0].args;
            assert.equal(event.itemId.toNumber(), totalNumber.toNumber(), 'Item id is correct');
            assert.equal(event.itemName, 'T-Shirt','Item name is correct');
            assert.equal(event.itemPrice, '1000000000000000000','Item price is correct');
            assert.equal(event.itemOwner, buyer, 'Item owner is correct');
            assert.equal(event.isItemSold, true, 'Item sold is correct');

            // Check the seller receives the funds
            let sellerNewBalance;
            sellerNewBalance = await web3.eth.getBalance(seller);
            sellerNewBalance = await new web3.utils.BN(sellerNewBalance);

            let price;
            price = web3.utils.toWei('1', 'Ether');
            price = new web3.utils.BN(price);

            const expectedBalacne = sellerOldBalance.add(price);
            assert.equal(expectedBalacne.toString(), sellerNewBalance.toString());
        })
        it('Selling the item twice should be rejected', async () => {
            // FAILURE: Cannot be purchased twice
            await movieReview.buyItem(totalNumber, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })
        it('Selling the item with wrong Id should be rejected', async () => {
            // FAILURE: Invalid Item ID
            await movieReview.buyItem(99, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected; 
        })
        it('Adding another testing item should be succefully done', async () => {
            await movieReview.createItem('Something', web3.utils.toWei('1', 'Ether'),{from: seller});
        })
        it('Buying the item with insufficient fund should be failed', async () => {
            // FAILURE: Invalid Value in Payment
            await movieReview.buyItem(totalNumber, {from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
        })

        it('Seller buying item from her/hisself should be rejected', async () => {  
            // FAILURE: Invalid Buyer cannot be the Seller
            await movieReview.buyItem(totalNumber, {from: seller, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })
        */


    })
    
});
