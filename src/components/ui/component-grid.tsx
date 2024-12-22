'use client';

import { motion } from 'framer-motion';

import { MessageSquare, Users, Calendar, Bell, Settings } from 'lucide-react';
import { useState } from 'react';

const components = [
  {
    title: 'Command Menu',
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-600',
    delay: 0.1,
    code: `export const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandGroup heading="Actions">
          <CommandItem>New File</CommandItem>
          <CommandItem>Copy Link</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
  },
  {
    title: 'Data Table',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    delay: 0.2,
    code: `export const DataTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`,
  },
  {
    title: 'Date Picker',
    icon: Calendar,
    color: 'from-green-500 to-green-600',
    delay: 0.3,
    code: `export const DatePickerDemo = () => {
  const [date, setDate] = useState<Date>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}`,
  },
  {
    title: 'Toast Notifications',
    icon: Bell,
    color: 'from-yellow-500 to-yellow-600',
    delay: 0.4,
    code: `export const ToastDemo = () => {
  return (
    <Toaster>
      <Toast>
        <ToastTitle>Success!</ToastTitle>
        <ToastDescription>
          Your changes have been saved.
        </ToastDescription>
        <ToastClose />
      </Toast>
    </Toaster>
  )
}`,
  },
  {
    title: 'Settings Panel',
    icon: Settings,
    color: 'from-pink-500 to-pink-600',
    delay: 0.5,
    code: `export const SettingsPanel = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="theme">Dark Mode</Label>
        <Switch id="theme" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Notifications</Label>
        <Switch id="notifications" />
      </div>
      <Separator />
      <Button variant="outline" className="w-full">
        Save Changes
      </Button>
    </div>
  )
}`,
  }
];

export const ComponentGrid = () => {
  const [selectedComponent, setSelectedComponent] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
      {components.map((component, index) => (
        <motion.div
          key={component.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: component.delay }}
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedComponent(index)}
          className="relative group cursor-pointer"
        >
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${component.color} opacity-10 rounded-xl blur-xl 
              transition-all duration-500 group-hover:opacity-20 group-hover:blur-2xl`} 
          />
          <div className="relative p-6 rounded-xl border border-white/10 backdrop-blur-sm bg-black/50">
            <component.icon className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="text-lg font-medium text-white/90">{component.title}</h3>
            
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: selectedComponent === index ? 'auto' : 0,
                opacity: selectedComponent === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <pre className="text-xs text-green-400 bg-black/50 p-4 rounded-lg overflow-x-auto">
                <code>{component.code}</code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
