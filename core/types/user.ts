import IProject from "./project";

export default interface IUser {
    id: string;
    title: string;
    img?: string;
    email?: string;
    projects?: IProject[];
    evm: string,
    bitcoin: string,
    litecoin: string,
    tron: string
}