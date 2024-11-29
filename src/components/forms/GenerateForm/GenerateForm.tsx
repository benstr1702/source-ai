import { FormWrapper } from "./components/FormWrapper";
import { PromptInput } from "./components/PromptInput";
import { ToneSelect } from "./components/ToneSelect";
import { BiasSelect } from "./components/BiasSelect";
import { ImageUpload } from "./components/ImageUpload";
import { PublicationSelect } from "./components/PublicationSelect";
import { SubmitButton } from "./components/SubmitButton";

export function GenerateForm() {
	return (
		<FormWrapper>
			<h2>Create Your Article</h2>
			<PromptInput />
			<div className="flex gap-4">
				<ToneSelect />
				<BiasSelect />
				<PublicationSelect />
				<ImageUpload />
			</div>
			<SubmitButton />
		</FormWrapper>
	);
}
