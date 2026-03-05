"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabase/client/supabase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, " Min 2 chacter").max(64, "Too long..."),

  email: z.string().email("Enter void E-mail."),

  date: z
    .date({
      error: (iss) =>
        iss.input === undefined ? " Select date." : "Invaid date.",
    })
    .refine((val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return val >= today;
    }, "Invaild date !!!"),

  guests: z.number().min(1, "Min 1 guests.").max(20, "Max 20 guests."),

  time: z.string().min(1, "Enter time!!"),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      time: "",
      guests: 1,
    },
  });

  async function onSubmit(data: FormValues) {
    const formattedDate = format(data.date, "dd MMMM yyyy", { locale: enGB }); // ← en üstte olmalı

    const { error } = await supabase.from("reservations").insert({
      name: data.name,
      email: data.email,
      date: format(data.date, "dd MMMM yyyy"),
      time: data.time,
      guests: data.guests,
    });

    // 2. Email gönder
    await fetch("/api/send-booking-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        date: formattedDate,
        time: data.time,
        guests: data.guests,
      }),
    });

    if (error) {
      toast.error("Something went wrong!", {
        description: error.message,
        position: "bottom-right",
      });
      return;
    }

    toast.success("Reservation confirmed!", {
      description: `${data.name} — ${format(data.date, "dd MMMM yyyy", { locale: enGB })}`,
      position: "bottom-right",
    });

    form.reset();
  }

  return (
    <div className="flex flex-col w-full  justify-center items-center h-screen py-8">
      <Card className="w-full max-w-lg mx-auto bg-gray-600/20 shadow-2xl border-2 border-gray-300">
        <CardHeader>
          <CardTitle>Book a table</CardTitle>
          <CardDescription>
            Fill in the information below to make a reservation
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="booking-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Ad Soyad */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="booking-name">Full name</FieldLabel>
                    <Input
                      {...field}
                      id="booking-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Joe Doe"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* E-posta */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="booking-email">E-posta</FieldLabel>
                    <Input
                      {...field}
                      id="booking-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="email@costum.com"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Tarih — Calendar Popover */}
              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Date</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd MMMM yyyy", {
                                locale: enGB,
                              })
                            : "Select date."}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          initialFocus
                          locale={enGB}
                        />
                      </PopoverContent>
                    </Popover>
                    <FieldDescription>
                      Choose today or a later date.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Saat */}
              <Controller
                name="time"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="booking-time">Time</FieldLabel>
                    <Input
                      {...field}
                      id="booking-time"
                      type="time"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="guests"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="guests">Guest number</FieldLabel>
                    <Input
                      {...field}
                      id="guests"
                      type="number"
                      min={1}
                      max={20}
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="booking-form">
              Book a table
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
