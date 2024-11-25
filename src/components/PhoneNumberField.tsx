import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Separator } from "./ui/separator";
import { ComponentProps, useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Input, {
  Country,
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import COUNTRY_LABELS from "react-phone-number-input/locale/en";

type Props = ComponentProps<typeof Input> & {
  className?: string;
  inputClassName?: string;
  ddnClassName?: string;
};

const PhoneNumberField = (props: Props) => {
  const { className, ddnClassName, inputClassName, value, onChange } = props;
  const [selectedCountry, setSelectedCountry] = useState<{
    country: Country;
    phoneCode: string;
  }>({ country: "IN", phoneCode: getCountryCallingCode("IN") });
  const [searchedValue, setSearchedValue] = useState("");
  const [open, setOpen] = useState(false);

  const countryValues = useMemo(
    () =>
      getCountries().map((c) => ({
        startIcon: <Icon icon={`circle-flags:${c.toLowerCase()}`} width={24} />,
        label: `${COUNTRY_LABELS[c]} (+${getCountryCallingCode(c)})`,
        onClick: () =>
          setSelectedCountry({
            country: c,
            phoneCode: getCountryCallingCode(c),
          }),
      })),
    [],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor>
        <div
          className={cn(
            className,
            "relative flex items-center justify-center rounded border border-zinc-200 ring-zinc-400",
          )}
        >
          <PopoverTrigger
            asChild
            className="inline-flex h-full items-center justify-start overflow-hidden border-none px-3 py-2"
          >
            <Button
              role="combobox"
              variant="ghost"
              className="min-w-24 rounded rounded-br-none rounded-tr-none border-none shadow-none focus-visible:ring-2"
            >
              <Icon
                icon={`circle-flags:${selectedCountry.country?.toLowerCase()}`}
                width={24}
              />
              <p className="text-sm">{"+" + selectedCountry.phoneCode}</p>
              <ChevronDown className={cn(open ? "rotate-180" : "")} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(ddnClassName, "w-full p-0")}>
            <Command shouldFilter={false}>
              <CommandInput
                value={searchedValue}
                onChangeCapture={({ currentTarget }) =>
                  setSearchedValue(currentTarget.value)
                }
                placeholder="Search countries..."
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countryValues
                    .filter((c) =>
                      c.label
                        .toLowerCase()
                        .includes(searchedValue.trim().toLowerCase()),
                    )
                    .map((country) => {
                      const { label, onClick, startIcon } = country;
                      return (
                        <CommandItem
                          key={label}
                          value={label}
                          onSelect={() => {
                            onClick();
                            setOpen(false);
                            setSearchedValue("");
                          }}
                        >
                          {startIcon}
                          <p className="w-full text-nowrap">{label}</p>
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedCountry.country === country
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
          <Separator
            orientation="vertical"
            className="-z-10 mx-1 h-6 bg-zinc-200"
          />
          <Input
            className={cn(
              inputClassName,
              "min-h-full w-full rounded rounded-bl-none rounded-tl-none border-0 p-2 text-sm outline-0 ring-black focus-visible:ring-2",
            )}
            value={value}
            international={props.international}
            country={selectedCountry.country}
            onChange={onChange}
            placeholder="Enter Phone Number..."
          />
        </div>
      </PopoverAnchor>
    </Popover>
  );
};

export default PhoneNumberField;
