import { Logo } from '../Logo'
import Navigation from './Navigation';

export default function Sidebar() {

  return (
    <div className="hidden md:flex grow flex-col gap-y-5 overflow-y-auto  px-6 sm:max-w-xs w-full  h-screen relative border-r border-r-white border-opacity-10">
      <div className="flex h-16 shrink-0 items-center w-full">
        <Logo />
      </div>
      <Navigation />
    </div>
  )
}
