CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"subject" varchar(255),
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "menu_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"name_en" varchar(255),
	"description" text,
	"price" integer NOT NULL,
	"category" varchar(100) NOT NULL,
	"image" text,
	"available" boolean DEFAULT true,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "newsletter" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "newsletter_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"customer_phone" varchar(50) NOT NULL,
	"customer_email" varchar(255),
	"items" text NOT NULL,
	"total_amount" integer NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"payment_method" varchar(100) DEFAULT 'cash',
	"payment_status" varchar(50) DEFAULT 'pending',
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255),
	"date" varchar(50) NOT NULL,
	"time" varchar(20) NOT NULL,
	"guests" integer NOT NULL,
	"special_requests" text,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "room_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"guest_name" varchar(255) NOT NULL,
	"guest_phone" varchar(50) NOT NULL,
	"guest_email" varchar(255),
	"room_type" varchar(100) NOT NULL,
	"check_in" varchar(50) NOT NULL,
	"check_out" varchar(50) NOT NULL,
	"guests" integer NOT NULL,
	"total_amount" integer NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"special_requests" text,
	"created_at" timestamp DEFAULT now()
);
