const { execProcedure,execQuery,execQuery2,} = require('../utils/db.js');

class TreasureController {
  async getNotices() {
		var query = `Select 
      idx,
      Title,
      TreasureContent,
      UpperCategory,
      UpperCategoryName,
      SubCategory,
      SubCategoryName,
      DetailCategory,
      DetailCategoryName,
      WriteTime,
      UpdateTime,
      Author
    from TBLTreasure tt
    inner join AboutTreasureCategory atc 
    on tt.UpperCategory = atc.UpperCategoryCode 
    and tt.SubCategory = atc.SubCategoryCode
    and tt.DetailCategory = atc.DetailCategoryCode
    `;

		var where = `where Author = '공지'`;

		var order = ' order by isnull(UpdateTime, writetime) desc';
		query = query + where + order;

		try {
			var response = await execQuery(query);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	async getList(condition) {
		var query = `Select 
      idx,
      Title,
      TreasureContent,
      UpperCategory,
      UpperCategoryName,
      SubCategory,
      SubCategoryName,
      DetailCategory,
      DetailCategoryName,
      WriteTime,
      UpdateTime,
      Author
    from TBLTreasure tt
    inner join AboutTreasureCategory atc 
    on tt.UpperCategory = atc.UpperCategoryCode 
    and tt.SubCategory = atc.SubCategoryCode
    and tt.DetailCategory = atc.DetailCategoryCode
    `;

    var where = `where Author <> '공지' `;
    
    console.log(condition);
    if (condition[1] == '전화 요청') where += ` and SubCategoryName = '전화 요청'`;
    else where += ` and SubCategoryName <> '전화 요청'`;

    if (condition[3] == '') {
      if (condition[0] != '전체' && condition[0] != '기타')
        where += ` and UpperCategoryName = '${condition[0]}' `;
      if (condition[0] == '기타')
        where += ` and UpperCategoryName = '전체' `;
      if (condition[1] != '전체')
        where += ` and SubCategoryName = '${condition[1]}' `;
      if (condition[2] != '전체')
        where += ` and DetailCategoryName = '${condition[2]}' `;
		} else {
			where += ` and Title like '%${condition[3]}%' or TreasureContent like '%${condition[3]}%'`;
    }
    

		var order = ' order by writetime desc';
		query = query + where + order;

		try {
			var response = await execQuery(query);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	async getContent(idx) {
		var query = `select 
      idx,
      Title,
      TreasureContent,
      UpperCategory,
      UpperCategoryName,
      SubCategory,
      SubCategoryName,
      DetailCategory,
      DetailCategoryName,
      WriteTime,
      UpdateTime,
      Author
    from TBLTreasure tt
    inner join AboutTreasureCategory atc 
    on tt.UpperCategory = atc.UpperCategoryCode 
    and tt.SubCategory = atc.SubCategoryCode
    and tt.DetailCategory = atc.DetailCategoryCode
    where idx = ${idx}`;

		try {
			var response = await execQuery(query);
			var data = [...response];
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	async getCategory(type, condition) {
		var query = `select 
      distinct
      ${type}Code as Code,
      ${type}Name as Name
    from AboutTreasureCategory
    Where ${type}Code is Not Null`;

		var where = '';

		var strCondition = JSON.parse(condition);
		if (type == 'SubCategory' && strCondition.upperCategoryCode != 0) {
			where = ` and UpperCategoryCode = ${strCondition.upperCategoryCode}`;
		} else if (type == 'DetailCategory' && strCondition.subCategoryCode != 0) {
			where = ` and UpperCategoryCode = ${strCondition.upperCategoryCode} and SubCategoryCode = ${strCondition.subCategoryCode}`;
		}
		query = query + where;
		var response = await execQuery(query);

		var data = [...response];
		return data;
	}

	async setContent(data) {
		var query = `Insert into TBLTreasure 
                (
                  Title, 
                  TreasureContent, 
                  UpperCategory, 
                  SubCategory, 
                  DetailCategory, 
                  WriteTime,
                  Author
                ) 
                Values
                (
                  '${data.headTitle}',
                  '${data.content}',
                  ${data.thisUpper},
                  ${data.thisSub},
                  ${data.thisDetail},
                  getDate(),
                  '${data.author}'
                )
                `;
		try {
			var response = await execQuery2(query);
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async editContent(data) {
		var query = `Update TBLTreasure 
                set 
                  Title = '${data.headTitle}', 
                  TreasureContent = '${data.content}', 
                  UpdateTime = getDate(),
                  Author = '${data.author}'
                Where Idx = ${data.idx}
                `;
		try {
			var response = await execQuery2(query);
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async deleteContent(idx) {
		var query = `Delete TBLTreasure Where Idx = ${idx}`;
		try {
			var response = await execQuery2(query);
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = TreasureController;