 import { useState } from "react";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { Linkedin, Github, Mail, Send, CheckCircle, Loader2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
 import { AvailabilityBadge } from "@/components/layout/AvailabilityBadge";
 import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 
 const contactSchema = z.object({
   name: z
     .string()
     .trim()
     .min(1, { message: "Name is required" })
     .max(100, { message: "Name must be less than 100 characters" }),
   email: z
     .string()
     .trim()
     .email({ message: "Please enter a valid email address" })
     .max(255, { message: "Email must be less than 255 characters" }),
   company: z
     .string()
     .trim()
     .max(100, { message: "Company name must be less than 100 characters" })
     .optional(),
   message: z
     .string()
     .trim()
     .min(10, { message: "Message must be at least 10 characters" })
     .max(2000, { message: "Message must be less than 2000 characters" }),
 });
 
 type ContactFormData = z.infer<typeof contactSchema>;
 
 const socialLinks = [
   {
     name: "LinkedIn",
     href: "https://linkedin.com/in/deegrey",
     icon: Linkedin,
     label: "Connect on LinkedIn",
   },
   {
     name: "GitHub",
     href: "https://github.com/quickhorn",
     icon: Github,
     label: "View GitHub profile",
   },
   {
     name: "Email",
     href: "mailto:dee@deegrey.com",
     icon: Mail,
     label: "dee@deegrey.com",
   },
 ];
 
 export default function Contact() {
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { toast } = useToast();
 
   const form = useForm<ContactFormData>({
     resolver: zodResolver(contactSchema),
     defaultValues: {
       name: "",
       email: "",
       company: "",
       message: "",
     },
   });
 
   const onSubmit = async (data: ContactFormData) => {
     setIsSubmitting(true);
     
     // Simulate form submission - will be replaced with Supabase later
     await new Promise((resolve) => setTimeout(resolve, 1000));
     
     console.log("Form submitted:", { 
       name: data.name, 
       email: "[redacted]", 
       company: data.company,
       messageLength: data.message.length 
     });
     
     setIsSubmitting(false);
     setIsSubmitted(true);
     
     toast({
       title: "Message sent!",
       description: "Thanks for reaching out. I'll get back to you soon.",
     });
   };
 
   return (
     <div className="container py-16 md:py-24">
       {/* Page Header */}
        <div className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-center">
          {/* Candid Photo */}
          <div className="relative shrink-0 animate-fade-in">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-lg" />
            <Avatar className="relative h-32 w-32 rounded-2xl border-2 border-background shadow-xl md:h-40 md:w-40">
              <AvatarImage 
                src="/placeholder.svg" 
                alt="Derick Grey - Let's connect!"
                className="rounded-2xl object-cover"
              />
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 text-3xl font-bold text-primary">
                😊
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Header Text */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <p className="mb-2 font-mono text-sm text-primary">// let's_connect</p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Looking for an engineering leader who builds great teams? Let's talk.
            </p>
            <div className="mt-4">
              <AvailabilityBadge />
            </div>
         </div>
       </div>
 
       <div className="grid gap-12 lg:grid-cols-2">
         {/* Direct Contact Options */}
         <div className="space-y-8">
           <div>
             <h2 className="mb-6 text-2xl font-bold">Direct Contact</h2>
             <p className="mb-8 text-muted-foreground">
               Prefer a more direct approach? Connect with me on these platforms.
             </p>
 
             <div className="space-y-4">
               {socialLinks.map((link) => (
                 <a
                   key={link.name}
                   href={link.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/30 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/50"
                 >
                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                     <link.icon className="h-5 w-5" />
                   </div>
                   <div>
                     <p className="font-medium">{link.name}</p>
                     <p className="text-sm text-muted-foreground">{link.label}</p>
                   </div>
                 </a>
               ))}
             </div>
           </div>
 
           {/* Calendar Booking Placeholder */}
           <Card className="border-dashed border-border/50 bg-card/20">
             <CardContent className="flex flex-col items-center justify-center py-8 text-center">
               <p className="mb-2 font-mono text-sm text-muted-foreground">
                 // calendar_booking
               </p>
               <p className="text-sm text-muted-foreground">
                 Prefer to schedule a call? Calendar booking coming soon.
               </p>
             </CardContent>
           </Card>
 
           {/* Response Time Note */}
           <div className="rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
             <p className="font-mono text-sm text-primary">// response_time</p>
             <p className="mt-2 text-sm text-muted-foreground">
               I typically respond within <span className="font-medium text-foreground">24-48 hours</span>. 
               For urgent opportunities, feel free to reach out via LinkedIn for a quicker response.
             </p>
           </div>
         </div>
 
         {/* Contact Form */}
         <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
           <CardHeader>
             <CardTitle className="text-xl">Send a Message</CardTitle>
             <CardDescription>
               Interested in discussing engineering leadership opportunities? I'd love to hear from you.
             </CardDescription>
           </CardHeader>
           <CardContent>
             {isSubmitted ? (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                 <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                 <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
                 <p className="text-muted-foreground">
                   Thanks for reaching out. I'll get back to you within 24-48 hours.
                 </p>
                 <Button
                   variant="outline"
                   className="mt-6"
                   onClick={() => {
                     setIsSubmitted(false);
                     form.reset();
                   }}
                 >
                   Send Another Message
                 </Button>
               </div>
             ) : (
               <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                   <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Name</FormLabel>
                         <FormControl>
                           <Input 
                             placeholder="Your name" 
                             {...field} 
                             className="bg-background/50"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
 
                   <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Email</FormLabel>
                         <FormControl>
                           <Input 
                             type="email"
                             placeholder="you@company.com" 
                             {...field} 
                             className="bg-background/50"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
 
                   <FormField
                     control={form.control}
                     name="company"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Company (Optional)</FormLabel>
                         <FormControl>
                           <Input 
                             placeholder="Your company" 
                             {...field} 
                             className="bg-background/50"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
 
                   <FormField
                     control={form.control}
                     name="message"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Message</FormLabel>
                         <FormControl>
                           <Textarea 
                             placeholder="Tell me about the opportunity..."
                             rows={5}
                             {...field} 
                             className="resize-none bg-background/50"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
 
                   <Button 
                     type="submit" 
                     className="w-full"
                     disabled={isSubmitting}
                   >
                     {isSubmitting ? (
                       <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         Sending...
                       </>
                     ) : (
                       <>
                         <Send className="mr-2 h-4 w-4" />
                         Send Message
                       </>
                     )}
                   </Button>
                 </form>
               </Form>
             )}
           </CardContent>
         </Card>
       </div>
     </div>
   );
 }