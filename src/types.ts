export interface Login {
	uuid: string
	username: string
	password: string
	md5: string
	sha1: string
	registered: string
}

export interface PostType {
	id: number;
	slug: string;
	url: string;
	title: string;
	content: string;
	image: string;
	thumbnail: string;
	status: string;
	category: string;
	publishedAt: string;
	updatedAt: string;
	userId: number;
}

export interface UserType {
	id: number
	firstname: string
	lastname: string
	email: string
	birthDate: string
	login: Login
	address: Address
	phone: string
	website: string
	company: Company
}

export interface Address {
	street: string
	suite: string
	city: string
	zipcode: string
	geo: Geo
}

export interface Geo {
	lat: string
	lng: string
}

export interface Company {
	name: string
	catchPhrase: string
	bs: string
}