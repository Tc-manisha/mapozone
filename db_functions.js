const Pool = require("pg").Pool;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
let secret =  "bezkoder-secret-key";
let multer = require('multer');
const path = require('path');
var liverurlnew = './src/image';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'profile_pic') {
        cb(null,liverurlnew+"/profile_pic");
      } 
     
      
    },
    filename: (req, file, cb) => {
      const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, filename);
    },
  });

  const upload = multer({
    storage:storage
})
let refreshTokenSecret = "some-secret-refresh-token-shit";
let tokenLife = 7200;
const pool = new Pool({
	user: "postgres",
	host: "16.16.23.96",
	database: "mapozone",
	password: "mapozone@2023",
	port: "5432",
});

const getRecordsByName = (f, e) =>
{
	let table = f;
	let columns = "";
	let uniqueCol = "";
	if (e === "null")
	{
		switch (f)
		{
			case "msoa":
				columns =
					table +
					".area, " +
					table +
					".msoa21nm, " +
					table +
					".msoa21cd, population, population / area as dpopu, genderm, genderm / area as dgm, genderf, genderf / area as dgf, age0to4, age0to4 / area as da0to4, age5to9, age5to9 / area as da5to9, age10to14, age10to14 / area as da10to14, age15to19, age15to19 / area as da15to19, age20to24, age20to24 / area as da20to24, age25to29, age25to29 / area as da25to29, age30to34, age30to34 / area as da30to34, age35to39, age35to39 / area as da35to39, age40to44, age40to44 / area as da40to44, age45to49, age45to49 / area as da45to49, age50to54, age50to54 / area as da50to54, age55to59, age55to59 / area as da55to59, age60to64, age60to64 / area as da60to64, age65to69, age65to69 / area as da65to69, age70to74, age70to74 / area as da70to74, age75to79, age75to79 / area as da75to79, age80to84, age80to84 / area as da80to84, age85plus, age85plus / area as da85plus, total_annual_income, net_annual_income,net_annual_income_before_housing_costs,net_annual_income_after_housing_costs,total_households,people0,person1,person2,person3,person4,person5,person6,person7,person8ormore, no_religion,christian,buddhist,hindu,jewish,muslim,sikh,other_religion,not_answered, total_annual_income / area as dtotal_annual_income, net_annual_income / area as dnet_annual_income ,net_annual_income_before_housing_costs / area as dnet_annual_income_before_housing_costs,net_annual_income_after_housing_costs / area as dnet_annual_income_after_housing_costs,total_households / area as dtotal_households,people0 / area as dpeople0,person1 / area as dperson1,person2 / area as person2,person3 / area as dperson3,person4 / area as dperson4,person5 / area as dperson5,person6 / area as dperson6,person7 / area as dperson7,person8ormore / area as dperson8ormore, no_religion / area as dno_religion,christian / area as dchristian,buddhist / area as dbuddhist,hindu / area as dhindu,jewish / area as djewish,muslim / area as dmuslim,sikh / area as dsikh,other_religion / area as dother_religion,not_answered / area as dnot_answered";
					uniqueCol = "msoa21cd";

				break;
			case "counties":
				columns =
					table +
					".area, " +
					table +
					".ctyua21nm, " +
					table +
					".ctyua21cd, population, population / area as dpopu, genderm, genderm / area as dgm, genderf, genderf / area as dgf, age0to4, age0to4 / area as da0to4, age5to9, age5to9 / area as da5to9, age10to14, age10to14 / area as da10to14, age15to19, age15to19 / area as da15to19, age20to24, age20to24 / area as da20to24, age25to29, age25to29 / area as da25to29, age30to34, age30to34 / area as da30to34, age35to39, age35to39 / area as da35to39, age40to44, age40to44 / area as da40to44, age45to49, age45to49 / area as da45to49, age50to54, age50to54 / area as da50to54, age55to59, age55to59 / area as da55to59, age60to64, age60to64 / area as da60to64, age65to69, age65to69 / area as da65to69, age70to74, age70to74 / area as da70to74, age75to79, age75to79 / area as da75to79, age80to84, age80to84 / area as da80to84, age85plus, age85plus / area as da85plus,total_annual_income, net_annual_income,net_annual_income_before_housing_costs,net_annual_income_after_housing_costs,total_households,people0,person1,person2,person3,person4,person5,person6,person7,person8ormore, no_religion,christian,buddhist,hindu,jewish,muslim,sikh,other_religion,not_answered, total_annual_income / area as dtotal_annual_income, net_annual_income / area as dnet_annual_income ,net_annual_income_before_housing_costs / area as dnet_annual_income_before_housing_costs,net_annual_income_after_housing_costs / area as dnet_annual_income_after_housing_costs,total_households / area as dtotal_households,people0 / area as dpeople0,person1 / area as dperson1,person2 / area as person2,person3 / area as dperson3,person4 / area as dperson4,person5 / area as dperson5,person6 / area as dperson6,person7 / area as dperson7,person8ormore / area as dperson8ormore, no_religion / area as dno_religion,christian / area as dchristian,buddhist / area as dbuddhist,hindu / area as dhindu,jewish / area as djewish,muslim / area as dmuslim,sikh / area as dsikh,other_religion / area as dother_religion,not_answered / area as dnot_answered";
				uniqueCol = "ctyua21cd";
				break;
			case "regions":
				columns =
					table +
					".area, " +
					table +
					".rgn21nm, " +
					table +
					".rgn21cd, population, population / area as dpopu, genderm, genderm / area as dgm, genderf, genderf / area as dgf, age0to4, age0to4 / area as da0to4, age5to9, age5to9 / area as da5to9, age10to14, age10to14 / area as da10to14, age15to19, age15to19 / area as da15to19, age20to24, age20to24 / area as da20to24, age25to29, age25to29 / area as da25to29, age30to34, age30to34 / area as da30to34, age35to39, age35to39 / area as da35to39, age40to44, age40to44 / area as da40to44, age45to49, age45to49 / area as da45to49, age50to54, age50to54 / area as da50to54, age55to59, age55to59 / area as da55to59, age60to64, age60to64 / area as da60to64, age65to69, age65to69 / area as da65to69, age70to74, age70to74 / area as da70to74, age75to79, age75to79 / area as da75to79, age80to84, age80to84 / area as da80to84, age85plus, age85plus / area as da85plus, total_annual_income, net_annual_income,net_annual_income_before_housing_costs,net_annual_income_after_housing_costs,total_households,people0,person1,person2,person3,person4,person5,person6,person7,person8ormore, no_religion,christian,buddhist,hindu,jewish,muslim,sikh,other_religion,not_answered, total_annual_income / area as dtotal_annual_income, net_annual_income / area as dnet_annual_income ,net_annual_income_before_housing_costs / area as dnet_annual_income_before_housing_costs,net_annual_income_after_housing_costs / area as dnet_annual_income_after_housing_costs,total_households / area as dtotal_households,people0 / area as dpeople0,person1 / area as dperson1,person2 / area as person2,person3 / area as dperson3,person4 / area as dperson4,person5 / area as dperson5,person6 / area as dperson6,person7 / area as dperson7,person8ormore / area as dperson8ormore, no_religion / area as dno_religion,christian / area as dchristian,buddhist / area as dbuddhist,hindu / area as dhindu,jewish / area as djewish,muslim / area as dmuslim,sikh / area as dsikh,other_religion / area as dother_religion,not_answered / area as dnot_answered";
				uniqueCol = "rgn21cd";
				break;
			default:
				break;
		}

		return new Promise(function (resolve, reject)
		{
			if(f === 'regions') {
				pool.query(
					"SELECT " +
					columns +
					", ST_AsGeoJSON(st_transform(" +
					table +
					".geom,4326))::json As geometry FROM ((" +
					table +
					" INNER JOIN " +
					table +
					"_population ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_population." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_gender ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_gender." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_age ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_age." +
					uniqueCol+
					" INNER JOIN " +
				  table +
				"_income ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_income.rgn22cd " +
				" INNER JOIN " +
				table +
				"_house_holds_size ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_house_holds_size.geography_code" +
				" INNER JOIN " +
				table +
				"_religion ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_religion.geography_code",
					(error, results) =>
					{
						if (error) reject(error.message);
						if (results) resolve(results.rows);
					}
				);
			}

			if(f === 'counties'){
				pool.query(
					"SELECT " +
					columns +
					", ST_AsGeoJSON(st_transform(" +
					table +
					".geom,4326))::json As geometry FROM ((" +
					table +
					" INNER JOIN " +
					table +
					"_population ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_population." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_gender ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_gender." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_age ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_age." +
					uniqueCol+
					" INNER JOIN " +
				      table +
				    "_income ON " +
				      table +
				      "." +
				    uniqueCol +
				    " = " +
				table +
				"_income.utla22cd" +
				" INNER JOIN " +
				table +
				"_house_holds_size ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_house_holds_size.geography_code" +
				" INNER JOIN " +
				table +
				"_religion ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_religion.geography_code" ,
				(error, results) =>
					{
						if (error) reject(error.message);
						if (results) resolve(results.rows);
					}
				);
			}
			if(f === 'msoa'){
				let mysql = "SELECT " +
				columns +
				", ST_AsGeoJSON(st_transform(" +
				table +
				".geom,4326))::json As geometry FROM ((" +
				table +
				" INNER JOIN " +
				table +
				"_population ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_population." +
				uniqueCol +
				") INNER JOIN " +
				table +
				"_gender ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_gender." +
				uniqueCol +
				") INNER JOIN " +
				table +
				"_age ON " +
				table +
				"." +
				uniqueCol +
				" = " +
				table +
				"_age." +
				uniqueCol+
				" INNER JOIN " +
				  table +
				"_income ON " +
				  table +
				  "." +
				uniqueCol +
				" = " +
				table +
				"_income.msoa21cd INNER JOIN " +
				table +
				"_house_holds_size ON " +
				 table +
			   "." +
			   uniqueCol +
			  " = " +
			  table +
			  "_house_holds_size.geography_code INNER JOIN " +
			  table +
			  "_religion ON " +
			  table +
			  "." +
			  uniqueCol +
			  " = " +
			  table +
			 "_religion.geography_code";
			
				pool.query(
					mysql,
				(error, results) =>
					{
						if (error) reject(error.message);
						if (results) resolve(results.rows);
					}
				);
			}
		});
	} else
	{

		table = "msoa";
		columns =
			table +
			".area, " +
			table +
			".msoa21nm, " +
			table +
			".msoa21cd, population, population / area as dpopu, genderm, genderm / area as dgm, genderf, genderf / area as dgf, age0to4, age0to4 / area as da0to4, age5to9, age5to9 / area as da5to9, age10to14, age10to14 / area as da10to14, age15to19, age15to19 / area as da15to19, age20to24, age20to24 / area as da20to24, age25to29, age25to29 / area as da25to29, age30to34, age30to34 / area as da30to34, age35to39, age35to39 / area as da35to39, age40to44, age40to44 / area as da40to44, age45to49, age45to49 / area as da45to49, age50to54, age50to54 / area as da50to54, age55to59, age55to59 / area as da55to59, age60to64, age60to64 / area as da60to64, age65to69, age65to69 / area as da65to69, age70to74, age70to74 / area as da70to74, age75to79, age75to79 / area as da75to79, age80to84, age80to84 / area as da80to84, age85plus, age85plus / area as da85plus, total_annual_income, net_annual_income,net_annual_income_before_housing_costs,net_annual_income_after_housing_costs,total_households,people0,person1,person2,person3,person4,person5,person6,person7,person8ormore, no_religion,christian,buddhist,hindu,jewish,muslim,sikh,other_religion,not_answered, total_annual_income / area as dtotal_annual_income, net_annual_income / area as dnet_annual_income ,net_annual_income_before_housing_costs / area as dnet_annual_income_before_housing_costs,net_annual_income_after_housing_costs / area as dnet_annual_income_after_housing_costs,total_households / area as dtotal_households,people0 / area as dpeople0,person1 / area as dperson1,person2 / area as person2,person3 / area as dperson3,person4 / area as dperson4,person5 / area as dperson5,person6 / area as dperson6,person7 / area as dperson7,person8ormore / area as dperson8ormore, no_religion / area as dno_religion,christian / area as dchristian,buddhist / area as dbuddhist,hindu / area as dhindu,jewish / area as djewish,muslim / area as dmuslim,sikh / area as dsikh,other_religion / area as dother_religion,not_answered / area as dnot_answered";
		uniqueCol = "msoa21cd";

		return new Promise(function (resolve, reject)
		{
			if (f === 'regions'){
				pool.query(
					"SELECT " +
					columns +
					", ST_AsGeoJSON(st_transform(" +
					table +
					".geom,4326))::json As geometry FROM ((" +
					table +
					" INNER JOIN " +
					table +
					"_population ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_population." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_gender ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_gender." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_age ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_age." +
					uniqueCol +
					" INNER JOIN " +
					table +
					"_income ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_income." +
					uniqueCol +
					" INNER JOIN " +
					table +
					"_house_holds_size ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_house_holds_size.geography_code" +
					" INNER JOIN " +
					table +
					"_religion ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_religion.geography_code" +
					" where msoa.rgn22cd='" +
					e +
					"'",
					(error, results) =>
					{
						if (error) reject(error);
						if (results) resolve(results.rows);
					}
				);
			}
			if(f === 'counties'){
				pool.query(
					"SELECT " +
					columns +
					", ST_AsGeoJSON(st_transform(" +
					table +
					".geom,4326))::json As geometry FROM ((" +
					table +
					" INNER JOIN " +
					table +
					"_population ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_population." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_gender ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_gender." +
					uniqueCol +
					") INNER JOIN " +
					table +
					"_age ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_age." +
					uniqueCol +
					" INNER JOIN " +
					table +
					"_income ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_income." +
					uniqueCol +
					" INNER JOIN " +
					table +
					"_house_holds_size ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_house_holds_size.geography_code" +
					" INNER JOIN " +
					table +
					"_religion ON " +
					table +
					"." +
					uniqueCol +
					" = " +
					table +
					"_religion.geography_code" +
					" where msoa.utla22cd='" +
					e +
					"'",
					(error, results) =>
					{
						if (error) reject(error);
						if (results) resolve(results.rows);
					}
				);
			}
		});
	}
};

const register = (data,profilePicFilename) =>{
	
	return new Promise(function (resolve, reject)
		{
			// console.log("nbhkvhjc")
			
			let password = bcrypt.hashSync(data.password, 8);
			console.log(password)
			let sql = "SELECT * FROM register WHERE email='"+ data.email+"'";
			// console.log(sql)
			pool.query(sql, (error,results) =>{
				
				if (error) reject(error.detail);
				
				if (results.rowCount > 0){
					// resolve(msg="email already exist");
					//   console.log(results.rowCount)
					resolve ({status: false, msg:"Email already exist"})
				} else {

					let sql1 = "INSERT INTO register (first_name, last_name, email, password, user_type,profile_pic) VALUES ('" +
					data.first_name+
					"', '" +
					data.last_name+
					"', '" +
					data.email+
					"', '" +
					password+
					"', '"+
					data.user_type+
					"','" +
					profilePicFilename+
					"')"
					console.log(sql1)
						pool.query(
							sql1 ,
							(error, results) =>
							{
								if (error) reject(error.detail);
								
								if (results) {
									var token = jwt.sign({ email: results.rows.email, name:results.rows.first_name, user_type:results.rows.user_type, userID:results.rows.id ,profile_pic:results.rows.profile_pic}, secret, {
										expiresIn: tokenLife // 2 hours
									  });
									resolve ({status: true, token:token, msg:"Register successfully"})
								};
							}
							
						);

				}
			})
			
		});
}



const login = (data) =>{
	return new Promise(function (resolve, reject)
		{
			let sql = "SELECT * FROM register WHERE email='"+ data.email+"'";
			pool.query(sql, (error,results) =>{
				console.log(sql)
				if (error) reject(error.detail);
				if (results.rowCount > 0){
					// resolve(msg="email already exist");
					// console.log(results.rows[0].password)
					let passwordIsValid = bcrypt.compareSync(
						data.password,
						results.rows[0].password
					  );
					  if(!passwordIsValid){
						resolve ({status: false, msg:"Wrong Password"})
					  }else {
						var token = jwt.sign({ email: results.rows[0].email, name:results.rows[0].first_name, user_type:results.rows[0].user_type, userID:results.rows[0].id }, secret, {
							expiresIn: tokenLife // 2 hours
						  });
						resolve ({status: true, token:token, msg:"login successfully"})
					  }
					
				} else {
					resolve ({status: false, msg:"Wrong Email ID"})
				}
			})			
			
		});
}

module.exports = {
	getRecordsByName,
	register,
	login
};
