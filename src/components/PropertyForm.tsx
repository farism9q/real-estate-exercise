import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "../lib/utils";
import { FormType, PropertyItemType } from "../types";
import { useCreateProperty } from "../features/property/useCreateProperty";
import { useUpdateProperty } from "../features/property/useUpdateProperty";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Minus, Plus } from "lucide-react";
import { useModal } from "../hooks/useStoreModal";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(1).max(40),
  features: z.string().min(1),
  warranties: z.string().min(1),
  description: z
    .string()
    .min(1, { message: "This field is required" })
    .max(200),
  address: z.string().min(1, { message: "This field is required" }).max(60),
  price: z
    .string()
    .refine(val => !isNaN(parseFloat(val)), { message: "Numbers" }),
});

interface PropertyFormProps {
  type: FormType;
  data?: PropertyItemType | null;
}

export default function PropertyForm({ type, data = null }: PropertyFormProps) {
  const [features, setFeatures] = useState<string[]>(data?.features || []);
  const [warranties, setWarranties] = useState<string[]>(
    data?.warranties || []
  );
  const navigate = useNavigate();
  const { createProperty, isCreating } = useCreateProperty();
  const { updateProperty, isUpdating } = useUpdateProperty();
  const { onClose } = useModal();

  useEffect(() => {
    if (type !== "edit") {
      return;
    }
    form.setValue("title", data?.title || "");
    form.setValue("address", data?.address || "");
    form.setValue("description", data?.description || "");
    form.setValue("features", " ");
    form.setValue("warranties", " ");
    form.setValue("price", data?.price.toString() || "");
  }, [data, type]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (type === "create" && form.getValues("features")) {
      features.push(form.getValues("features"));
    }
    if (type === "create" && form.getValues("warranties")) {
      warranties.push(form.getValues("warranties"));
    }

    if (type === "edit" && form.getValues("features").trim()) {
      features.push(form.getValues("features"));
    }

    if (type === "edit" && form.getValues("warranties").trim()) {
      warranties.push(form.getValues("warranties"));
    }

    const price = parseFloat(values.price);
    const submittedForm = {
      ...values,
      features,
      warranties,
      price,
    };

    if (type === "create") {
      createProperty(submittedForm, {
        onSuccess: ({ id }) => {
          navigate(`/properties/${id}`);
        },
      });
    }

    if (type === "edit") {
      updateProperty({
        id: data?.id!,
        updatedProperty: {
          ...submittedForm,
          createdAt: new Date(Date.now()),
        },
      });

      onClose();
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="flex flex-col h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.7fr] items-center gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300 ">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder="Property title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300 ">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder="Property address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300 ">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300 ">
                  description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A brief description of the property"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300 ">
                    {"feature " +
                      (features.length + 1) +
                      `${type === "edit" ? " ?" : ""}`}
                  </FormLabel>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                        placeholder="Safety, Smart technologies, etc.."
                        {...field}
                      />
                    </FormControl>

                    <button
                      type="button"
                      className="bg-primary text-white rounded-sm p-[2px]"
                      onClick={() => {
                        if (!field.value) return;

                        setFeatures(curr => [field.value, ...curr]);
                        form.setValue("features", "");
                      }}
                    >
                      <Plus size={22} />
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {features.length > 0 && (
              <div
                className={cn(
                  "p-2 h-20 overflow-scroll no-scrollbar",
                  type !== "edit" ? "md:w-[25%]" : ""
                )}
              >
                {features.map(feature => (
                  <div className="flex justify-between items-center px-2">
                    {feature}

                    <button
                      type="button"
                      onClick={() => {
                        setFeatures(currFeatures =>
                          currFeatures.filter(item => item !== feature)
                        );
                      }}
                    >
                      <Minus className="text-rose-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="warranties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300 ">
                    {"warranty " +
                      (warranties.length + 1) +
                      `${type === "edit" ? " ?" : ""}`}
                  </FormLabel>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                        placeholder="10 years warranties, ..., ..., etc "
                        {...field}
                      />
                    </FormControl>

                    <button
                      type="button"
                      className="bg-primary text-white rounded-sm p-[2px]"
                      onClick={() => {
                        if (!field.value) return;

                        setWarranties(curr => [field.value, ...curr]);
                        form.setValue("warranties", "");
                      }}
                    >
                      <Plus size={22} />
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {warranties.length > 0 && (
              <div
                className={cn(
                  "p-2 h-20 overflow-scroll no-scrollbar",
                  type !== "edit" ? "md:w-[25%]" : ""
                )}
              >
                {warranties.map(warranty => (
                  <div className="flex justify-between items-center px-2">
                    {warranty}

                    <button
                      type="button"
                      onClick={() => {
                        setWarranties(currWarranties =>
                          currWarranties.filter(item => item !== warranty)
                        );
                      }}
                    >
                      <Minus className="text-rose-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end items-center gap-2">
            {type === "edit" && (
              <Button
                type="button"
                variant="secondary"
                disabled={isLoading}
                onClick={() => onClose()}
              >
                Close
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {type === "create" ? "Create" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
