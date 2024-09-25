export interface IInvitee extends IInviteeBody {
  id: number;
  createdAt: Date;
}

export interface IInviteeParams {
  username: string
}

export interface IInviteeBody {
  name: string
  username: string
}
