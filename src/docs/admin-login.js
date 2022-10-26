let loginDocument = {
	swagger: '2.0',
	info: {
		title: 'TREASURE-BACK 문서',
		description: '',
		version: '1.0',
	},
	produces: ['application/json'],
	paths: {
		'/signup': {
			post: {
				tags: ['/treasure/list'],
				description: '리스트를 뿌려주는 api 입니다.',
				parameters: [
					{
						name: 'username',
						in: 'formData',
						description: '사용자 아이디',
						required: true,
						type: 'string',
					},
					{
						name: 'password',
						in: 'formData',
						description: '비밀번호',
						required: true,
						type: 'string',
					},
					{
						name: 'nickname',
						in: 'formData',
						description: '닉네임',
						required: true,
						type: 'string',
					},
				],
				responses: {
					200: {
						description: '[완료]가입이 정상적으로 완료되었습니다.',
						content: {
							'application/json': {},
							'application/xml': {},
						},
					},
					409: {
						description:
							'[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다.',
						content: {
							'application/json': {},
							'application/xml': {},
						},
					},
					500: {
						description: '[에러]서버에 문제가 있어 회원 가입에 실패하였습니다.',
						content: {
							'application/json': {},
							'application/xml': {},
						},
					},
				},
			},
		},
		'/login': {
			post: {
				tags: ['/login'],
				description:
					'로그인하는 API 입니다. 사용자 아이디와 암호를 입력해야 합니다.',
				parameters: [
					{
						name: 'username',
						in: 'formData',
						description: '사용자 아이디',
						required: true,
						type: 'string',
					},
					{
						name: 'password',
						in: 'formData',
						description: '비밀번호',
						required: true,
						type: 'string',
					},
				],
				responses: {
					200: {
						description: '[완료]로그인이 완료되었습니다',
						content: {
							'application/json': {},
							'application/xml': {},
						},
					},
					401: {
						description: '[에러]비밀번호가 맞지 않아 로그인에 실패하였습니다',
						content: {
							'application/json': {},
							'application/xml': {},
						},
					},
					500: {
						description: '[에러]서버에 문제가 있어 로그인하지 못했습니다',
						content: {
							'application/json': {},
							'application/xml': {},
						},
					},
				},
			},
		},
	},
};

module.exports = { loginDocument };