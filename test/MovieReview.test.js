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
            
            assert.equal(locationNumber,1);
            const event = result.logs[0].args;
                       
            assert.equal(event.id.toNumber(), locationNumber.toNumber(), 'Location id is correct');
            assert.equal(event.name, 'Burnaby','Location name is correct');
            assert.equal(event.active, true,'status is correct');
        })

        it ('Adding location should fail if done by user', async ()=>{
            
            await movieReview.addLocation('Burnaby',{from: user1}).should.be.rejected;
            
        })

        it ('Adding location should fail if name not given', async ()=>{
            
            await movieReview.addLocation('',{from: deployer}).should.be.rejected;
            
        })

        it ('Adding location should fail if same name location already exists', async ()=>{
            
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
            const event = result.logs[0].args;
                       
            assert.equal(event.id.toNumber(), locationNumber.toNumber(), 'Location id is correct');
            assert.equal(event.name, 'Burnaby','Location name is correct');
            assert.equal(event.active, false,'status is correct');
            
        })

        it ('Deleting location should fail if already inactive', async ()=>{
            await movieReview.deleteLocation(1,{from: deployer}).should.be.rejected;
            
        })
        
    })

    describe('Adding and deleting Cinema Hall', async()=>{
        let result, locationNumber
        
        before(async ()=>{
            result = await movieReview.addLocation('Vancouver',{from: deployer})
            locationNumber = await movieReview.locationNumber()
        })
        it ('Adding cinema hall should be successful if all correct and done by owner', async ()=>{
            
            result = await movieReview.addCinemaHall('North Vancouver', 2,{from: deployer})
            cinemaHallNumber = await movieReview.cinemaHallNumber()
            assert.equal(cinemaHallNumber,1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), cinemaHallNumber.toNumber(), 'Cinema Hall id is correct');
            assert.equal(event.locationId.toNumber(), 2, 'Location id is correct');
            assert.equal(event.name, 'North Vancouver','Cinema Hall name is correct');
            assert.equal(event.active, true,'status is correct');
        })

        it ('Adding cinema hall should fail if done by user', async ()=>{
            
            await movieReview.addCinemaHall('West Vancouver', 2,{from: user1}).should.be.rejected;
            
        })

        it ('Adding cinema hall should fail if name not given', async ()=>{
            
            await movieReview.addCinemaHall('',2, {from: deployer}).should.be.rejected;
            
        })

        it ('Adding cinema hall should fail if  location is inactive or invalid', async ()=>{
            
            await movieReview.addCinemaHall('West Vancouver', 1,{from: deployer}).should.be.rejected;
            await movieReview.addCinemaHall('West Vancouver', 3,{from: deployer}).should.be.rejected;
            
        })

        it ('Adding cinema hall should fail if  sane name cinemal hall already present on that location', async ()=>{
            
            await movieReview.addCinemaHall('North Vancouver', 2,{from: deployer}).should.be.rejected;            
            
        })
       

        it ('Deleting cinema hall should fail if invalid cinema id passes', async ()=>{
            await movieReview.deleteCinemaHall(2,{from: deployer}).should.be.rejected;
            
        })

        it ('Deleting cinema hall should fail if called by user', async ()=>{
            await movieReview.deleteCinemaHall(1,{from: user1}).should.be.rejected;
            
        })

        it ('Deleting cinema hall should be successfull if done by owner', async ()=>{
            result =  await movieReview.deleteCinemaHall(1,{from: deployer});
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), cinemaHallNumber.toNumber(), 'Cinema Hall id is correct');
            assert.equal(event.locationId.toNumber(), 2, 'Location id is correct');
            assert.equal(event.name, 'North Vancouver','Cinema Hall name is correct');
            assert.equal(event.active, false,'status is correct');
            
        })

        it ('Deleting cinema hall should fail if already inactive', async ()=>{
            await movieReview.deleteCinemaHall(1,{from: deployer}).should.be.rejected;
            
        })
        
    })

    
});
