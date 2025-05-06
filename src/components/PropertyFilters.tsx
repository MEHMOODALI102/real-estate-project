import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  CommandDialog, 
  CommandInput,
  CommandEmpty,
  Command, 
  CommandGroup, 
  CommandItem,
  CommandList
} from '@/components/ui/command';

const formSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  propertyType: z.string().optional(),
  priceRange: z.string().optional(),
  transactionType: z.string().optional(),
});

type PropertyFiltersProps = {
  onFilterChange: (values: z.infer<typeof formSchema>) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilterChange }) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      location: "",
      propertyType: "",
      priceRange: "",
      transactionType: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onFilterChange(values);
  };
  
  React.useEffect(() => {
    const subscription = form.watch(() => {
      form.handleSubmit(onSubmit)();
    });
    
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);
  
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  const locations = [
    "All Locations",
    "South Delhi",
    "Gurgaon",
    "Noida",
    "Greater Noida",
    "Faridabad",
    "Central Delhi",
    "North Delhi",
    "West Delhi",
    "East Delhi",
    "Dwarka",
    "Ladakh",
    "Himachal Pradesh",
    "Uttarakhand",
    "Punjab",
    "Haryana",
    "Rajasthan",
    "Madhya Pradesh",
    "Maharashtra",
    "Gujarat",
    "Karnataka",
    "Kerala",
    "Tamil Nadu",
    "Andhra Pradesh",
    "Telangana",
    "Odisha",
    "Bihar",
    "Jharkhand"  
  ];
  
  const propertyTypes = [
    "All Types",
    "Apartment",
    "Villa",
    "Penthouse",
    "Bungalow",
    "Farmhouse"
  ];
  
  const priceRanges = [
    "Any Price",
    "Under ₹1 Cr",
    "₹1 Cr - ₹2 Cr",
    "₹2 Cr - ₹3 Cr",
    "₹3 Cr - ₹5 Cr",
    "Above ₹5 Cr"
  ];
  
  const transactionTypes = [
    "Buy or Rent",
    "Buy",
    "Rent"
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="lg:flex items-center gap-4">
              <div className="flex-1 mb-4 lg:mb-0">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search properties... (Press ⌘ K)"
                            className="pl-10"
                            onClick={() => setOpen(true)}
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="hidden lg:grid lg:grid-cols-4 gap-4 flex-1">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Price Range" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="transactionType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Buy or Rent" />
                        </SelectTrigger>
                        <SelectContent>
                          {transactionTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="lg:hidden w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between items-center">
                      <span>Filters</span>
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-screen max-w-md p-4" align="start">
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                {locations.map((location) => (
                                  <SelectItem key={location} value={location}>
                                    {location}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                              <SelectContent>
                                {propertyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="priceRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Range</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select price range" />
                              </SelectTrigger>
                              <SelectContent>
                                {priceRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="transactionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transaction Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Buy or Rent" />
                              </SelectTrigger>
                              <SelectContent>
                                {transactionTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-luxury-gold text-luxury-black hover:bg-luxury-lightGold"
                        onClick={() => form.handleSubmit(onSubmit)()}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search for properties, locations, features..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Locations">
              {locations.map((location) => (
                <CommandItem 
                  key={location}
                  onSelect={() => {
                    form.setValue('location', location);
                    setOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {location}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Property Types">
              {propertyTypes.map((type) => (
                <CommandItem 
                  key={type}
                  onSelect={() => {
                    form.setValue('propertyType', type);
                    setOpen(false);
                  }}
                >
                  {type}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Transaction Types">
              {transactionTypes.map((type) => (
                <CommandItem 
                  key={type}
                  onSelect={() => {
                    form.setValue('transactionType', type);
                    setOpen(false);
                  }}
                >
                  {type}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default PropertyFilters;
