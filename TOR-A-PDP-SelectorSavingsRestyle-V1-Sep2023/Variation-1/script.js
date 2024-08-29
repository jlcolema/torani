/* Variation 1 */
function selectorSavingsRestyleTest() {
  var waitForElements = setInterval(() => {
    const pageContainer = document.querySelector('.variant-wrapper'); // Select Target Element Here
    if (pageContainer) {
      window.ranSelectorSavingsRestyleTest = true;
      clearInterval(waitForElements);
      // Scope CSS
      document.body.classList.add('ti12');
      // Add Test Functions Here
      selectorSavingsRestyleUPDATE(); // Rename
    }
  }, 100);
}
function selectorSavingsRestyleUPDATE() {
  /* Breadcrumbs */
  // Move breadcrumbs outside of `.page-content` to display at full-width.
  const breadcrumbs = document.querySelector('.breadcrumb');
  const pageContent = document.querySelector('.page-content');
  if (breadcrumbs) {
    pageContent.parentNode.insertBefore(breadcrumbs, pageContent);
  }

  /* Product Description */
  // Move product description to be above the ingredients.
  const productAttributes = document.querySelector('.product_attributes');
  const productDescription = document.querySelector('.product-block.hide-on-mobile');
  const ingredientsContent = document.querySelector('.ingredientscont');
  // Create a container to group the description and ingredients.
  const productAttributesGroup = document.createElement('div');
  productAttributesGroup.classList.add('product_attributes__group');
  // Add the container to the attributes section.
  if (productAttributes) {
    productAttributes.insertBefore(productAttributesGroup, productAttributes.firstChild);
  }
  // Move the description inside the new container.
  if (productDescription) {
    productDescription.classList.add('descriptioncont');
    productDescription.classList.remove('product-block', 'hide-on-mobile');
    const productDescriptionTitle = document.createElement('h2');
    productDescriptionTitle.innerHTML = 'Product Description';
    productDescription.insertBefore(productDescriptionTitle, productDescription.firstChild);
    productAttributesGroup.appendChild(productDescription);
  }
  // Move the ingredients inside the new container.
  if (ingredientsContent) {
    productAttributesGroup.appendChild(ingredientsContent);
  }

  /* Choose Your Size */
  // Change field labels to "Choose Your Size"
  const chooseYourSize = document.querySelectorAll('.variant__label, .variant-input-wrap legend');
  chooseYourSize.forEach(element => {
    if (element) {
      element.textContent = 'Choose Your Size';
    }
  });

  // Dropdown

  // Function to update the selected variant
  function updateSelectedVariant() {
    // Remove the existing 'variant-input--selected-size' div, if any
    const existingDiv = document.querySelector('.variant-input--selected-size');
    if (existingDiv) {
      existingDiv.remove();
    }
    // Find the checked radio input
    const checkedInput = document.querySelector('.variant-input input[type="radio"]:checked');
    // Find the label associated with the checked radio input
    const associatedLabel = document.querySelector(`label[for="${checkedInput.id}"]`);
    // Create a new div element
    const newDiv = document.createElement('div');
    newDiv.classList.add('variant-input--selected-size');
    // Copy content from the associated label to the new div
    newDiv.innerHTML = associatedLabel.innerHTML;
    // Find the element before which you want to insert the new div
    const targetElement = document.querySelector('.variant-input-wrap');
    // Insert the new div before the target element
    targetElement.parentNode.insertBefore(newDiv, targetElement);

    // New code for handling out-of-stock
    const selectedSizeDiv = document.querySelector('.variant-input--selected-size');
    if (associatedLabel && associatedLabel.classList.contains('disabled')) {
      selectedSizeDiv.classList.add('variant-input--out-of-stock');
    } else {
      selectedSizeDiv.classList.remove('variant-input--out-of-stock');
    }

    // Handle saving text
    const savingsTextSpan = associatedLabel.querySelector('.plus-packsize__label span:last-child');
    const productPriceSavings = document.querySelector('.product__price-savings');
    if (savingsTextSpan && savingsTextSpan.textContent.includes('Save')) {
      const savingText = savingsTextSpan.textContent.match(/Save.*$/)[0];
      productPriceSavings.textContent = savingText;
    } else {
      productPriceSavings.textContent = '';
    }
  }

  // Run the function immediately to handle the pre-selected radio button
  updateSelectedVariant();
  // Also run the function whenever a radio input changes
  const radioInputs = document.querySelectorAll('.variant-input input[type="radio"]');
  radioInputs.forEach(input => {
    input.addEventListener('change', updateSelectedVariant);
  });
  // Add toggle events to show and hide the dropdown.
  function addToggleEvents() {
    // Cache DOM elements for performance
    const selectedSizeDiv = document.querySelector('.variant-input--selected-size');
    const variantInputWrap = document.querySelector('.variant-input-wrap');
    const variantInputs = document.querySelectorAll('.variant-input');
    // Toggle class when `.variant-input--selected-size` is clicked
    if (selectedSizeDiv) {
      selectedSizeDiv.addEventListener('click', (event) => {
        variantInputWrap.classList.toggle('variant-input-wrap--is-open');
        selectedSizeDiv.classList.toggle('variant-input-wrap--is-open');
        event.stopPropagation(); // Prevent the event from bubbling up
      });
    }
    // Remove class when any `.variant-input` is clicked
    variantInputs.forEach(input => {
      input.addEventListener('click', (event) => {

        const labelInsideInput = input.querySelector('label');

        if (labelInsideInput && labelInsideInput.classList.contains('disabled')) {
          selectedSizeDiv.classList.add('variant-input--out-of-stock');
        } else {
          selectedSizeDiv.classList.remove('variant-input--out-of-stock');
        }

        variantInputWrap.classList.remove('variant-input-wrap--is-open');
        selectedSizeDiv.classList.remove('variant-input-wrap--is-open');
        event.stopPropagation(); // Prevent the event from bubbling up
      });
    });
    // Remove class when clicking outside
    document.addEventListener('click', () => {
      variantInputWrap.classList.remove('variant-input-wrap--is-open');
      selectedSizeDiv.classList.remove('variant-input-wrap--is-open');
    });
  }

  // Make sure "In Stock" is only displaying once
  function handleRadioClick(event) {
    const variantId = event.target.getAttribute('data-variant-id');
    const inventoryStatusContainer = document.querySelector('#product_inventory_status');

    if (inventoryStatusContainer) {
      // Hide all children
      Array.from(inventoryStatusContainer.children).forEach(child => {
        child.style.display = 'none';
      });

      // Show the relevant inventory status
      const relevantInventoryStatus = inventoryStatusContainer.querySelector(`#product_inventory_status_${variantId}`);
      if (relevantInventoryStatus) {
        relevantInventoryStatus.style.display = 'block';
      }
    }
  }

  // Add event listeners to radio inputs
  const newRadioInputs = document.querySelectorAll('input[type="radio"][data-variant-id]');
  newRadioInputs.forEach(input => {
    input.addEventListener('click', handleRadioClick);
  });

  // Call this function inside your `onDocumentLoad` or `initialize` function
  addToggleEvents();
  // If there is a `.glassplasticheader` outside of `.variant-input-wrap`,
  // move it inside after the legend element.
  function moveGlassPlasticHeader() {
    // Find the `.glassplasticheader` div
    const glassPlasticHeader = document.querySelector('.glassplasticheader');
    // Find the `.variant__label` label
    const variantLabel = document.querySelector('.variant__label');
    // Find the `.variant-input-wrap` and `legend` elements
    const variantInputWrap = document.querySelector('.variant-input-wrap');
    const variantLegend = document.querySelector('.variant-input-wrap legend');
    // Check if all elements exist
    if (glassPlasticHeader && variantLabel && variantInputWrap && variantLegend) {
      // Check if `.glassplasticheader` appears after `.variant__label`
      let currentElement = variantLabel;
      let found = false;
      while (currentElement.nextElementSibling) {
        currentElement = currentElement.nextElementSibling;
        if (currentElement === glassPlasticHeader) {
          found = true;
          break;
        }
      }
      // If yes, move `.glassplasticheader` to be inside `.variant-input-wrap` and place it after the `legend`
      if (found) {
        variantInputWrap.insertBefore(glassPlasticHeader, variantLegend.nextElementSibling);
      }
    }
  }
  moveGlassPlasticHeader();
}
try {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    selectorSavingsRestyleTest();
  } else {
    document.addEventListener('DOMContentLoaded', selectorSavingsRestyleTest);
  }
} catch (err) {
  const e = {
    dev: 'U05C4LLSK6G',
    vwotest: '12',
    vwodesc: 'TOR-A-PDP-SelectorSavingsRestyle-V1-Sep2023 - Variation 1',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };
  const x = new XMLHttpRequest();
  x.open('POST', 'https://us-central1-tixray.cloudfunctions.net/err', !0), x.send(JSON.stringify(e));
}
