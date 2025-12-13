import SidebarWeb from "@/components/SidebarWeb";
import Taskbar from "@/components/Taskbar";
import { Label } from "@/components/ui/label";

export default function VintageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex justify-between flex-col">
      <div>
        <Taskbar></Taskbar>
      </div>
      <div className="flex h-[95%] p-4 gap-4">
        <SidebarWeb></SidebarWeb>
        <div className="w-full h-full overflow-y-auto  ">{children}</div>
      </div>
    </div>
  );
}
