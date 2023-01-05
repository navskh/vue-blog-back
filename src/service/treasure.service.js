const { execProcedure,execQuery,execTransactionQuery,} = require('../utils/db.js');

class TreasureService {
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
    
    var response = await execQuery(query);
    return response;
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

		if (condition[1] == '전화 요청')
			where += ` and SubCategoryName = '전화 요청'`;
		else where += ` and SubCategoryName <> '전화 요청'`;

		if (condition[3] == '') {
			if (condition[0] != '전체' && condition[0] != '기타')
				where += ` and UpperCategoryName = '${condition[0]}' `;
			if (condition[0] == '기타') where += ` and UpperCategoryName = '전체' `;
			if (condition[1] != '전체')
				where += ` and SubCategoryName = '${condition[1]}' `;
			if (condition[2] != '전체')
				where += ` and DetailCategoryName = '${condition[2]}' `;
		} else {
			where += ` and Title like '%${condition[3]}%' or TreasureContent like '%${condition[3]}%'`;
		}

		var order = ' order by writetime desc';
    query = query + where + order;
    
    var response = await execQuery(query);

    return response;
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

    var response = await execQuery(query);
    return response;
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
    return response;
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
    
    var response = await execTransactionQuery(query);
    return response;
  }

  async editContent(data) {
    var query = `Update TBLTreasure 
                set 
                  UpperCategory = '${data.thisUpper}',
                  SubCategory = '${data.thisSub}',
                  DetailCategory = '${data.thisDetail}',
                  Title = '${data.headTitle}', 
                  TreasureContent = '${data.content}', 
                  UpdateTime = getDate(),
                  Author = '${data.author}'
                Where Idx = ${data.idx}
                `;
      var response = await execTransactionQuery(query);
      return response;
  }

  async deleteContent(idx) {
		var query = `Delete TBLTreasure Where Idx = ${idx}`;
    var response = await execTransactionQuery(query);
    return response;
  }
}

module.exports = TreasureService;