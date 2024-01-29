import { Component } from "@/lib/types/strapi";

export interface InfoBlock extends Component {
	title: string;
	content: string;
}