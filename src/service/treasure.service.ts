import { PostSchema } from "../schema/treasure.shema";

const {
	execProcedure,
	execQuery,
	execTransactionQuery,
} = require('../utils/db.ts');

export default class TreasureService {
  async getRequestById(idx: number): Promise<any> {
    var query = `
    SELECT
      ISNULL(Writer + '/' + Processor, '작자미상') + 
      Case 
        When ProcessStatus = 'ProcessComplete' 
        Then ' <span class="badge badgeinfo ">완료</span> '
        When ProcessStatus = 'ProcessCancel' 
        Then ' <span class="badge badgeerror">불가</span> '
        When ProcessStatus = 'Request' 
        Then ' <span class="badge badgewarning">요청</span> '
        Else ''
      End
      as 'Author',
      '0' as 'DetailCategory',
      '전체' as 'DetailCategoryName',
      '0' as 'SubCategory',
      '전체' as 'SubCategoryName',
      '11' as 'UpperCategory',
      '업무요청게시판' as 'UpperCategoryName',
      '[' + UnivServiceID + '] ' + Title as Title,
      Case 
        When ProcessStatus = 'ProcessComplete' and Comment <> ''
          Then '<font style="font-weight: bold;color:blue"> 답변 : ' + Comment + '</font> <br><br>'
        When ProcessStatus = 'ProcessCancel' and Comment <> ''
          Then '<font style="font-weight: bold;color:red"> 답변 : ' + Comment + '</font> <br><br>'
        Else ''
      End
      + Contents as 'TreasureContent',
      Mdate as 'UpdateTime',
      RDate as 'WriteTime',
      Idx as 'idx'
    from PIMS_Statistics.dbo.TBL_Request
    Where Idx = ${idx}`;

		var response = await execQuery(query);
		return response;
  }

  async getRequestLists(): Promise<any> {
    var query = `
    Select 
      IsNull(Writer + '/' + Processor, '몰라용') as 'Author',
      '0' as 'DetailCategory',
      '전체' as 'DetailCategoryName',
      '0' as 'SubCategory',
      '전체' as 'SubCategoryName',
      '11' as 'UpperCategory',
      '업무요청게시판' as 'UpperCategoryName',
      Case 
        When ProcessStatus = 'ProcessComplete' 
        Then '<span class="badge badgeinfo ">완료</span> '
        When ProcessStatus = 'ProcessCancel' 
        Then '<span class="badge badgeerror">불가</span> '
        When ProcessStatus = 'Request' 
        Then '<span class="badge badgewarning">요청</span> '
        Else ''
      End +
      Title as Title,
      Contents as 'TreasureContent',
      Mdate as 'UpdateTime',
      RDate as 'WriteTime',
      Idx as 'idx'
    from PIMS_Statistics.dbo.TBL_Request
    Order By Idx Desc
    `
    var response = await execQuery(query);
    return response;
  }

	async getNotices(): Promise<any> {
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

	async getList(condition: Array<string>, mode: string): Promise<any> {
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

		/**
		 * 전화요청/PIMS 예외처리
		 */
		// if (condition[0] == '전화 요청') {
		// 	where += ` and UpperCategoryName = '전화 요청'`;
		// } else {
		// 	where += ` and UpperCategoryName <> '전화 요청'`;
		// }

		// console.log(`condition ${condition}, mode ${mode}`);

		if (condition[3] == '') {
			if (condition[0] != 'PIMS') {
				where += ` and UpperCategoryName <> 'PIMS'`;
      }
      if (condition[0] != '전화 요청') {
				where += ` and UpperCategoryName <> '전화 요청'`;
			}
			if (condition[0] != '전체' && condition[0] != '기타')
				where += ` and UpperCategoryName = '${condition[0]}' `;
			if (condition[0] == '기타') where += ` and UpperCategoryName = '전체' `;
			if (condition[1] != '전체')
				where += ` and SubCategoryName = '${condition[1]}' `;
			if (condition[2] != '전체')
				where += ` and DetailCategoryName = '${condition[2]}' `;
		} else {
			// console.log(mode);
			if (mode == 'pims') {
				where += ` and UpperCategoryName = 'PIMS'  and (Title like '%${condition[3]}%' or TreasureContent like '%${condition[3]}%')`;
			} else {
				where += ` and UpperCategoryName <> 'PIMS'  and (Title like '%${condition[3]}%' or TreasureContent like '%${condition[3]}%')`;
			}
		}

		var order = ' order by writetime desc';
		query = query + where + order;

		console.log(query);
		var response = await execQuery(query);
		// console.log(`response ${response}`);

		return response;
	}

	async getContent(idx: number): Promise<any> {
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

  async getCategory(type: string, condition: string): Promise<any> {
		var query = `select 
      distinct
      ${type}Code as Code,
      ${type}Name as Name
    from AboutTreasureCategory
    Where ${type}Code is Not Null`;

		var where = '';

		if (condition != '') {
			var strCondition = JSON.parse(condition);
			if (type == 'SubCategory' && strCondition.upperCategoryCode != 0) {
				where = ` and UpperCategoryCode = ${strCondition.upperCategoryCode}`;
			} else if (
				type == 'DetailCategory' &&
				strCondition.subCategoryCode != 0
			) {
				where = ` and UpperCategoryCode = ${strCondition.upperCategoryCode} and SubCategoryCode = ${strCondition.subCategoryCode}`;
			}
		}
		query = query + where;

		var response = await execQuery(query);
		return response;
	}

  async setContent(data: PostSchema): Promise<any> {
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

	async editContent(data: PostSchema): Promise<any>  {
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

	async deleteContent(idx: number): Promise<any>  {
		var query = `Delete TBLTreasure Where Idx = ${idx}`;
		var response = await execTransactionQuery(query);
		return response;
	}
}
