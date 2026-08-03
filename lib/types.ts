import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type IUser = {
    success: boolean,
    message: string,
    data: {
        profile: {
            id: string,
            name: string,
            email: string,
            activeStatus: string,
            role: string,
            createdAt: string,
            updatedAt: string,
            profile: {
                id: string,
                profilePhoto: string,
                bio: string | null,
                userId: string,
                createdAt: string,
                updatedAt: string
            }
        }
    }
}

export type NavbarProps = {
    user: IUser
}
 type ILanlord ={
 name:string;
 email:string;
}
export type IPost ={
    id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  isPremium: boolean;
  createdAt: string; 
  updatedAt: string; 
  categoryName: string;
  landlordId: string;
  categoryId: number;
  landlord:ILanlord
}
export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}