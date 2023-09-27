# FishEye - Website

FishEye a website that allows freelance photographers to showcase their best work.

## Background of Project

- For the past few weeks, you've been working as a junior developer at Techasite, a consulting firm specializing in website and mobile application development.

    Together with your project manager Amanda and the UI Designer, you've just had a project kick-off meeting with a new client, FishEye. They've recently raised some funds and would like to update their website.

## Instructions

- Import data (10%)
    - Your application that retrieves data from the Json File.
    In scripts/pages/index.js you'll :
        1. Add fetch to the getPhotographers function to retrieve your datas, and create a console.log of these datas
        2. Return the data
        3. Modify `scripts/pages/home.js` to retrieve the necessary
        necessary data (id, tagline, city, etc.)

- Integrate home page (20%)

- Manage navigation between the home page and the photographer page (35%)
    - Here, you'll need to build a system to switch from the clicked link to page loading.
    To do this, you'll use the id of the photographer on which the user has clicked and pass it as a parameter to the parameter of the url displayed.

        ● You can start by making a console.log of the data corresponding to the photographer selected from the URL.
        ● You'll then display the page content in the next step.
        ● Pay attention to the accessibility of your links (aria-label, manage focus, etc.).

- Show static page content photographer (45%)
    - You'll need to reuse the Photographer Template function you
    you extended in step 3 to display your page content, as well as your
    as well as your fetch function.

        ● You'll also be displaying the photographers' achievements, by
        creating a factory for Media.
        ● Don't forget the small insert showing the photographer's daily rate.
        photographer displayed.
        ● You'll take care of the number of likes, the LightBox and the
        ContactForm in a later step.

- Create the contact modal (55%).
    - The modal base is already present in the codebase. You add form management and the missing style.

- Managing Lightbox media (65%)
    - The LightBox, which appears when you click on a photograph, and in which you can scroll through the other photographs.
    The LightBox closes when you click on the close button.

    Make sure you manage Lightbox opening, scrolling and closing with the mouse click, but also with the keyboard. To do this, you'll need to use EventListeners and trigger the corresponding actions.

- View and manage likes (80%)
    - In this step, you'll increment the likes on the photos photos, and list the likes of all the photographs for the bottom which represents all the likes of a photographer.

        ● You can manage the total number of likes from your photographer Template.
        ● Here, there's no need to save your likes: if you refresh the page, the likes don't need to be saved.

- Create the sorting system (90%)
    - You can use the sort method to do your sorting. Once you've finalized your photographer page, you can also create an accessibility report with an accessibility validator or checklist, and correct your code accordingly.