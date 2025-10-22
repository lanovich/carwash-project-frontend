import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib";
import { Article } from "@/widgets/section-block/ui";
import { ContactForm } from "@/entities/user/ui";
import { BookingSummary } from "@/entities/booking/ui";
import { selectObjectType } from "@/entities/booking/model";
import { OBJECT_TYPES } from "@/entities/car/model";
import {
  ContactFormSchema,
  contactFormSchema,
  DEFAULT_CONTACT_FORM_VALUES,
} from "@/entities/user/model";

export const BookingSidebar = () => {
  const objectType = useSelector(selectObjectType);

  const methods = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_CONTACT_FORM_VALUES,
  });

  useEffect(() => {
    if (objectType) {
      methods.reset({
        ...methods.getValues(),
        carType: OBJECT_TYPES[objectType].caption.toUpperCase(),
      });
    }
  }, [objectType]);

  return (
    <FormProvider {...methods}>
      <section
        className={cn("flex flex-col gap-6 w-full xl:w-2/5 sticky top-4")}
      >
        <Article title="Информация о вас">
          <ContactForm />
        </Article>

        <Article title="Детали записи">
          <BookingSummary />
        </Article>
      </section>
    </FormProvider>
  );
};
